import { Controller, Get, Post, Patch, Param, Query, UploadedFile, UseInterceptors, Body, Req, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../database/prisma.service';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('contactIds') contactIdsRaw: string,
    @Body('contactId') contactIdLegacy: string, // Support legacy single ID
    @Body('tag') tag: string,
    @Req() req: any,
  ) {
    const userId = req.user?.id || 'user_2l9W3k7X5Y8Z0a1B2c3D4e5F6g'; // Fallback for dev

    let contactIds: string[] = [];
    if (contactIdsRaw) {
      try {
        contactIds = JSON.parse(contactIdsRaw);
      } catch (e) {
        // If not JSON, assume comma separated or single value
        contactIds = contactIdsRaw.split(',').map(id => id.trim()).filter(Boolean);
      }
    } else if (contactIdLegacy) {
      contactIds = [contactIdLegacy];
    }

    // Returns immediately with PROCESSING status (202 Accepted)
    return this.mediaService.uploadVideo(file, userId, contactIds, tag);
  }

  @Post(':id') // Using POST for update to avoid CORS preflight issues sometimes, but PATCH is better. Sticking to PATCH as per plan.
  @Patch(':id')
  async updateAsset(
    @Param('id') id: string,
    @Body() body: { contactIds?: string[]; ownerLabel?: string },
    @Req() req: any,
  ) {
    const userId = req.user?.id || 'user_2l9W3k7X5Y8Z0a1B2c3D4e5F6g';
    return this.mediaService.updateAsset(id, userId, body);
  }

  @Get()
  listAssets(@Query('limit') limit?: string) {
    const take = limit ? Number.parseInt(limit, 10) : 50;

    return this.prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        contacts: { // Updated from contact
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
      take: Number.isNaN(take) ? 50 : take,
    });
  }

  @Get('uploads/:filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    res.sendFile(filePath);
  }
}
