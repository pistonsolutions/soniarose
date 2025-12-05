import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { PrismaService } from '../database/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

// Mock fluent-ffmpeg
const mockFfmpegInstance = {
    output: jest.fn().mockReturnThis(),
    videoCodec: jest.fn().mockReturnThis(),
    audioCodec: jest.fn().mockReturnThis(),
    format: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation(function (this: any, event, callback) {
        if (event === 'end') {
            // Simulate async completion
            setTimeout(callback, 10);
        }
        return this;
    }),
    run: jest.fn(),
};

jest.mock('fluent-ffmpeg', () => {
    return jest.fn(() => mockFfmpegInstance);
});

jest.mock('fs', () => ({
    existsSync: jest.fn().mockReturnValue(true),
    mkdirSync: jest.fn(),
    statSync: jest.fn().mockReturnValue({ size: 1024 }),
    unlinkSync: jest.fn(),
}));

describe('MediaService', () => {
    let service: MediaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MediaService,
                {
                    provide: PrismaService,
                    useValue: {
                        mediaAsset: {
                            create: jest.fn().mockResolvedValue({ id: 'asset-1' }),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<MediaService>(MediaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should process video successfully', async () => {
        const mockFile = {
            path: '/tmp/test.mov',
            originalname: 'test.mov',
        } as any;

        const result = await service.processVideo(mockFile, 'user-1', 'contact-1', 'Birthday');

        expect(result).toEqual({ id: 'asset-1' });
        expect(prismaService.mediaAsset.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                userId: 'user-1',
                contactId: 'contact-1',
                ownerLabel: 'Birthday',
                mimeType: 'video/mp4',
            }),
        }));
        expect(fs.unlinkSync).toHaveBeenCalledWith('/tmp/test.mov');
    });
});
