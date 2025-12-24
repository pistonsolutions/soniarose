import { Injectable, Logger, BadRequestException, Inject } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Queue } from 'bullmq';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import 'multer';
import { MEDIA_QUEUE_TOKEN } from './media.constants';
import { MediaJobData } from './media.processor';

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor(
        private readonly prisma: PrismaService,
        @Inject(MEDIA_QUEUE_TOKEN) private readonly mediaQueue: Queue<MediaJobData>,
    ) {
        // Ensure upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    /**
     * Accept video upload, save file, create DB record, and enqueue background job.
     * Returns immediately with PROCESSING status.
     */
    async uploadVideo(file: Express.Multer.File, userId: string, contactIds: string[] = [], ownerLabel?: string) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        const filename = `${randomUUID()}.mp4`;
        const rawPath = path.join(this.uploadDir, `raw-${filename}`);

        // Move the uploaded file to our uploads dir (raw file)
        fs.renameSync(file.path, rawPath);

        this.logger.log(`Received video upload: ${file.originalname} -> queuing as ${filename}`);

        // Get file stats
        const stats = fs.statSync(rawPath);

        // Create DB record with PROCESSING status
        const asset = await this.prisma.mediaAsset.create({
            data: {
                userId,
                contacts: {
                    connect: contactIds.map((id) => ({ id })),
                },
                ownerLabel,
                objectKey: filename,
                mimeType: 'video/mp4',
                sizeBytes: stats.size,
                status: 'PROCESSING',
            },
        });

        // Enqueue background job
        const jobId = `media-${asset.id}`;
        await this.mediaQueue.add(jobId, {
            assetId: asset.id,
            filePath: rawPath,
            filename,
            userId,
            contactIds,
            ownerLabel,
        }, {
            jobId,
        });

        this.logger.log(`Enqueued media processing job ${jobId}`);

        return asset;
    }

    /**
     * Process video in background (called by MediaProcessor).
     */
    async processMediaJob(data: MediaJobData): Promise<void> {
        const { assetId, filePath, filename } = data;
        const outputPath = path.join(this.uploadDir, filename);

        this.logger.log(`Processing video: ${filePath} -> ${outputPath}`);

        try {
            await new Promise<void>((resolve, reject) => {
                ffmpeg(filePath)
                    .output(outputPath)
                    .videoCodec('libx264')
                    .audioCodec('aac')
                    .format('mp4')
                    .on('end', () => {
                        this.logger.log(`Video processing completed: ${filename}`);
                        resolve();
                    })
                    .on('error', (err: any) => {
                        this.logger.error(`Video processing failed: ${err.message}`);
                        reject(new Error(err.message));
                    })
                    .run();
            });

            // Get file stats
            const stats = fs.statSync(outputPath);

            // Update DB record to READY
            await this.prisma.mediaAsset.update({
                where: { id: assetId },
                data: {
                    status: 'READY',
                    sizeBytes: stats.size,
                },
            });

            // Cleanup raw file
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            this.logger.log(`Media asset ${assetId} is ready`);
        } catch (error: any) {
            // Update DB record to FAILED
            await this.prisma.mediaAsset.update({
                where: { id: assetId },
                data: {
                    status: 'FAILED',
                    errorReason: error.message,
                },
            });

            // Cleanup raw file
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            throw error;
        }
    }

    async updateAsset(id: string, userId: string, data: { contactIds?: string[]; ownerLabel?: string }) {
        const updateData: any = {};

        if (data.ownerLabel !== undefined) {
            updateData.ownerLabel = data.ownerLabel;
        }

        if (data.contactIds) {
            updateData.contacts = {
                set: data.contactIds.map((cid) => ({ id: cid })),
            };
        }

        return this.prisma.mediaAsset.update({
            where: { id, userId },
            data: updateData,
            include: {
                contacts: true,
            },
        });
    }
}
