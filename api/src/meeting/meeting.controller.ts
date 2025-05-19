import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create.dto';
import { Meeting } from './meeting.entity';
import { UpdateMeetingDto } from './dto/update.dto';
@Controller('meetings')
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  async listAll(): Promise<Meeting[]> {
    return this.meetingService.listAll();
  }

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingService.create(createMeetingDto);
  }

  @Patch()
  async update(@Body() updateMeetingDto: UpdateMeetingDto): Promise<Meeting> {
    return this.meetingService.update(updateMeetingDto);
  }
}
