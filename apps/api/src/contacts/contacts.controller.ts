import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';

@Controller('contacts')
@UseGuards(ClerkAuthGuard)
export class ContactsController {
  private readonly logger = new Logger(ContactsController.name);

  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  create(@Req() req: any, @Body() payload: CreateContactDto) {
    return this.contactsService.create(req.user.id, payload);
  }

  @Get('debug/whoami')
  whoami(@Req() req: any) {
    return { userId: req.user.id };
  }

  @Get()
  async findAll(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;
    res.header('X-Debug-UserId', userId);
    return this.contactsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.contactsService.findOne(req.user.id, id);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() payload: UpdateContactDto) {
    return this.contactsService.update(req.user.id, id, payload);
  }

  @Patch(':id')
  patch(@Req() req: any, @Param('id') id: string, @Body() payload: UpdateContactDto) {
    return this.contactsService.update(req.user.id, id, payload);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.contactsService.remove(req.user.id, id);
  }

  @Get(':id/messages')
  getMessages(@Req() req: any, @Param('id') id: string) {
    return this.contactsService.getMessages(req.user.id, id);
  }

  @Post(':id/messages')
  sendMessage(@Req() req: any, @Param('id') id: string, @Body('body') body: string) {
    this.logger.log(`Received sendMessage request for contact ${id} from user ${req.user.id}`);
    return this.contactsService.sendMessage(req.user.id, id, body);
  }
}
