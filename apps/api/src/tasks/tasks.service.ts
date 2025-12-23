import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@soniarose/database';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                userId,
            },
        });
    }

    async findAll(userId: string, params?: { contactId?: string; status?: any }) {
        const where: Prisma.TaskWhereInput = { userId };

        if (params?.contactId) {
            where.contactId = params.contactId;
        }

        if (params?.status) {
            where.status = params.status;
        }

        return this.prisma.task.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                contact: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    async findOne(userId: string, id: string) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });

        if (!task || task.userId !== userId) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }

    async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
        await this.findOne(userId, id); // Ensure exists and belongs to user

        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(userId: string, id: string) {
        await this.findOne(userId, id); // Ensure exists and belongs to user

        return this.prisma.task.delete({
            where: { id },
        });
    }
}
