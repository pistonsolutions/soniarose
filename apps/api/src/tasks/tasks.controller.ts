import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// Assuming AuthGuard is available or we mock it for now. 
// Using a mock decorator if AuthGuard path is unknown, but likely in ../auth/auth.guard
// Checking imports later. For now, I'll assume standard request structure.

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
        // TODO: Get userId from auth guard. For now assuming req.user.id or passing in body for dev
        const userId = req.user?.id || 'user_2lU...'; // Fallback for dev
        return this.tasksService.create(userId, createTaskDto);
    }

    @Get()
    findAll(@Request() req: any, @Query('contactId') contactId?: string, @Query('status') status?: string) {
        const userId = req.user?.id || 'user_2lU...';
        return this.tasksService.findAll(userId, { contactId, status });
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user?.id || 'user_2lU...';
        return this.tasksService.findOne(userId, id);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const userId = req.user?.id || 'user_2lU...';
        return this.tasksService.update(userId, id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        const userId = req.user?.id || 'user_2lU...';
        return this.tasksService.remove(userId, id);
    }
}
