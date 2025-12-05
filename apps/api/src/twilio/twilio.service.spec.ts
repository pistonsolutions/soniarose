import { ConfigService } from '@nestjs/config';
import { TwilioService } from './twilio.service';

jest.mock('twilio', () => {
  const createMessageMock = jest.fn();
  const twilioConstructorMock = jest.fn().mockImplementation(() => ({
    messages: {
      create: createMessageMock,
    },
  }));

  return {
    __esModule: true,
    Twilio: twilioConstructorMock,
    __mocks: {
      createMessageMock,
      twilioConstructorMock,
    },
  };
});

const {
  __mocks: { createMessageMock, twilioConstructorMock },
} = jest.requireMock('twilio') as {
  __mocks: {
    createMessageMock: jest.Mock;
    twilioConstructorMock: jest.Mock;
  };
};

describe('TwilioService', () => {
  const configValues: Record<string, string | undefined> = {
    TWILIO_ACCOUNT_SID: 'AC123',
    TWILIO_AUTH_TOKEN: 'token',
    TWILIO_MESSAGING_SERVICE_SID: 'MG456',
    TWILIO_CALLER_ID: '+1234567890',
  };

  const getMock = jest.fn(
    <T = string>(key: string, defaultValue?: T) => (configValues[key] ?? defaultValue) as T,
  );

  const configService = {
    get: getMock,
  } as unknown as ConfigService;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(configValues, {
      TWILIO_ACCOUNT_SID: 'AC123',
      TWILIO_AUTH_TOKEN: 'token',
      TWILIO_MESSAGING_SERVICE_SID: 'MG456',
      TWILIO_CALLER_ID: '+1234567890',
    });
  });

  it('sends SMS using messaging service SID when provided', async () => {
    createMessageMock.mockResolvedValueOnce({ sid: 'SM1' });
    const service = new TwilioService(configService);

    await service.sendSms({ to: '+15554443333', body: 'Hello there!' });

    expect(twilioConstructorMock).toHaveBeenCalledWith('AC123', 'token');
    expect(createMessageMock).toHaveBeenCalledWith({
      to: '+15554443333',
      from: undefined,
      messagingServiceSid: 'MG456',
      body: 'Hello there!',
      mediaUrl: undefined,
    });
  });

  it('falls back to caller ID when messaging service is absent', async () => {
    configValues.TWILIO_MESSAGING_SERVICE_SID = '';
    createMessageMock.mockResolvedValueOnce({ sid: 'SM2' });
    const service = new TwilioService(configService);

    await service.sendSms({ to: '+15550001111', body: 'Fallback' });

    expect(createMessageMock).toHaveBeenCalledWith({
      to: '+15550001111',
      from: '+1234567890',
      messagingServiceSid: undefined,
      body: 'Fallback',
      mediaUrl: undefined,
    });

    configValues.TWILIO_MESSAGING_SERVICE_SID = 'MG456';
  });

  it('reuses the Twilio client on subsequent calls', async () => {
    createMessageMock.mockResolvedValue({ sid: 'SM3' });
    const service = new TwilioService(configService);

    await service.sendSms({ to: '+15559998877', body: 'First' });
    await service.sendSms({ to: '+15559998877', body: 'Second' });

    expect(twilioConstructorMock).toHaveBeenCalledTimes(1);
    expect(createMessageMock).toHaveBeenCalledTimes(2);
  });

  it('throws when credentials are missing', async () => {
    configValues.TWILIO_ACCOUNT_SID = '';
    const service = new TwilioService(configService);

    await expect(
      service.sendSms({ to: '+15556667777', body: 'Should fail' }),
    ).rejects.toThrow('Twilio credentials are not configured');

    configValues.TWILIO_ACCOUNT_SID = 'AC123';
  });
});
