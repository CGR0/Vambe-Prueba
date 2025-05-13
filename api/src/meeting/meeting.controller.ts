import { Controller, Get } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meetings')
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Get()
  async getMeetings() {
    return this.meetingService.getMeetings();
  }
}
