import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import 'multer';

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor(private readonly prisma: PrismaService) {
        // Ensure upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async processVideo(file: Express.Multer.File, userId: string, contactIds: string[] = [], ownerLabel?: string) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        const filename = `${randomUUID()}.mp4`;
        const outputPath = path.join(this.uploadDir, filename);

        this.logger.log(`Processing video: ${file.originalname} -> ${filename}`);

        return new Promise((resolve, reject) => {
            ffmpeg(file.path)
                .output(outputPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .format('mp4')
                .on('end', async () => {
                    this.logger.log(`Video processing completed: ${filename}`);

                    // Get file stats
                    const stats = fs.statSync(outputPath);

                    // Create DB record
                    try {
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
                            },
                        });

                        // Cleanup temp file if different
                        if (file.path !== outputPath) {
                            fs.unlinkSync(file.path);
                        }

                        resolve(asset);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (err: any) => {
                    this.logger.error(`Video processing failed: ${err.message}`);
                    reject(new BadRequestException(`Video processing failed: ${err.message}`));
                })
                .run();
        });
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
