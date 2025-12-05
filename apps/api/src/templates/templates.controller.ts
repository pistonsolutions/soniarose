import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('templates')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }

    @Post()
    create(@Request() req: any, @Body() createTemplateDto: CreateTemplateDto) {
        const userId = req.user?.id || 'user_2lU...';
        return this.templatesService.create(userId, createTemplateDto);
    }

    @Get()
    findAll(@Request() req: any) {
        const userId = req.user?.id || 'user_2lU...';
        return this.templatesService.findAll(userId);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user?.id || 'user_2lU...';
        return this.templatesService.findOne(userId, id);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
        const userId = req.user?.id || 'user_2lU...';
        return this.templatesService.update(userId, id, updateTemplateDto);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        const userId = req.user?.id || 'user_2lU...';
        return this.templatesService.remove(userId, id);
    }
}
