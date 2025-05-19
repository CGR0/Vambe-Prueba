import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create.dto';
import { Meeting } from './meeting.entity';
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
}
