import { Queue } from 'bullmq';
import { WorkflowsService } from './workflows.service';
import type { PrismaService } from '../database/prisma.service';

describe('WorkflowsService', () => {
  const addMock = jest.fn();
  const queueMock = { add: addMock } as unknown as Queue;
  let prismaMock: PrismaService;
  let service: WorkflowsService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock = {
      workflowRun: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    } as unknown as PrismaService;

    service = new WorkflowsService(queueMock, prismaMock);
  });

  it('enqueues jobs with deterministic IDs and payload', async () => {
    addMock.mockResolvedValueOnce({ id: 'job-1' });

    await service.enqueue('FIVE_DAYS_OF_JOY', { contactId: 'contact-1', extra: 'data' });

    expect(addMock).toHaveBeenCalledWith(
      expect.stringContaining('five_days_of_joy-contact-1'),
      {
        type: 'FIVE_DAYS_OF_JOY',
        payload: { contactId: 'contact-1', extra: 'data' },
      },
      {
        delay: 0,
        jobId: expect.stringContaining('five_days_of_joy-contact-1'),
      },
    );
  });

  it('schedules the five day workflow helper', async () => {
    const spy = jest.spyOn(service, 'enqueue').mockResolvedValueOnce(undefined as never);

    await service.scheduleFiveDaysOfJoy('contact-2');

    expect(spy).toHaveBeenCalledWith('FIVE_DAYS_OF_JOY', { contactId: 'contact-2' });
  });

  it('delays birthday workflow until provided date', async () => {
    const future = new Date(Date.now() + 5_000);
    await service.scheduleBirthdayVideo('contact-3', future);

    expect(addMock).toHaveBeenCalledWith(
      expect.stringContaining('birthday_video-contact-3'),
      expect.any(Object),
      expect.objectContaining({
        delay: expect.any(Number),
      }),
    );
  });

  it('enqueues manual video jobs', async () => {
    await service.enqueueManualVideo('contact-4', 'https://example.com/video.mp4');

    expect(addMock).toHaveBeenCalledWith(
      expect.stringContaining('send_video-contact-4'),
      {
        type: 'SEND_VIDEO',
        payload: { contactId: 'contact-4', mediaUrl: 'https://example.com/video.mp4' },
      },
      expect.any(Object),
    );
  });
});
