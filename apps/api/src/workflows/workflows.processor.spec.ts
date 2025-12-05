import { Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import { WorkflowsProcessor } from './workflows.processor';
import { WORKFLOW_QUEUE_NAME } from './workflows.constants';
import type { WorkflowQueueData } from './workflows.service';

const workerOnMock = jest.fn();
const workerCloseMock = jest.fn();
let registeredHandler: ((job: { id: string; data: WorkflowQueueData }) => Promise<void>) | undefined;

jest.mock('bullmq', () => ({
  Worker: jest.fn().mockImplementation((name, handler, options) => {
    registeredHandler = handler as typeof registeredHandler;
    return {
      on: workerOnMock,
      close: workerCloseMock,
      name,
      options,
    };
  }),
  Job: class {},
}));

describe('WorkflowsProcessor', () => {
  const redisConnection = {
    quit: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    registeredHandler = undefined;
  });

  const createProcessor = () => new WorkflowsProcessor(redisConnection as unknown as any);

  it('initialises a BullMQ worker with the shared queue name', () => {
    createProcessor();

    expect(Worker).toHaveBeenCalledWith(
      WORKFLOW_QUEUE_NAME,
      expect.any(Function),
      expect.objectContaining({ connection: redisConnection }),
    );
    expect(workerOnMock).toHaveBeenCalledWith('completed', expect.any(Function));
    expect(workerOnMock).toHaveBeenCalledWith('failed', expect.any(Function));
  });

  it('logs unhandled workflow job types without throwing', async () => {
    const processor = createProcessor();
    const warnSpy = jest.spyOn((processor as unknown as { logger: Logger }).logger, 'warn').mockImplementation();
    expect(registeredHandler).toBeDefined();

    await registeredHandler?.({
      id: 'job-unknown',
      data: { type: 'UNKNOWN' as never, payload: { contactId: 'contact-0' } },
    });

    expect(warnSpy).toHaveBeenCalledWith('Unhandled workflow job type: UNKNOWN');
  });

  it('closes worker and redis connection on module destroy', async () => {
    const processor = createProcessor();

    await processor.onModuleDestroy();

    expect(workerCloseMock).toHaveBeenCalled();
    expect(redisConnection.quit).toHaveBeenCalled();
  });

  it('handles the registered job handler path for known workflows', async () => {
    createProcessor();
    expect(registeredHandler).toBeDefined();

    await registeredHandler?.({ id: 'job1', data: { type: 'FIVE_DAYS_OF_JOY', payload: { contactId: '123' } } });
    await registeredHandler?.({ id: 'job2', data: { type: 'BIRTHDAY_VIDEO', payload: { contactId: '234' } } });
    await registeredHandler?.({ id: 'job3', data: { type: 'SEND_VIDEO', payload: { contactId: '345' } } });

    // No exceptions should be thrown during handler execution for stubbed cases.
  });
});
