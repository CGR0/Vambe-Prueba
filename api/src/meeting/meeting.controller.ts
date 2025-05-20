import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create.dto';
import { Meeting } from './meeting.entity';
@Controller('meetings')
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  async listAll(@Query('entities') entities: string): Promise<Meeting[]> {
    return this.meetingService.listAll(entities);
  }

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingService.create(createMeetingDto);
  }
}
