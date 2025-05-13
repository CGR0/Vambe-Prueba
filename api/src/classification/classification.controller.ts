import { Controller, Get } from '@nestjs/common';
import { ClassificationService } from './classification.service';

@Controller('classifications')
export class ClassificationController {
  constructor(private classificationService: ClassificationService) {}

  @Get()
  async getClassifications() {
    return this.classificationService.getClassifications();
  }
}
