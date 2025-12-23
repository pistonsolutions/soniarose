import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Prisma } from '@soniarose/database';

@Injectable()
export class TemplatesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, createTemplateDto: CreateTemplateDto) {
        return this.prisma.messageTemplate.create({
            data: {
                ...createTemplateDto,
                userId,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.messageTemplate.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
    }

    async findOne(userId: string, id: string) {
        const template = await this.prisma.messageTemplate.findUnique({
            where: { id },
        });

        if (!template || template.userId !== userId) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return template;
    }

    async update(userId: string, id: string, updateTemplateDto: UpdateTemplateDto) {
        await this.findOne(userId, id); // Ensure exists and belongs to user

        return this.prisma.messageTemplate.update({
            where: { id },
            data: updateTemplateDto,
        });
    }

    async remove(userId: string, id: string) {
        const template = await this.findOne(userId, id); // Ensure exists and belongs to user

        if (template.isSystem) {
            throw new Error('Cannot delete system templates');
        }

        return this.prisma.messageTemplate.delete({
            where: { id },
        });
    }
}
