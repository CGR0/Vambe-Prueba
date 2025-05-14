import { Controller, Get } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { Classification } from './classification.entity';
@Controller('classifications')
export class ClassificationController {
  constructor(private classificationService: ClassificationService) {}

  @Get()
  async listAll(): Promise<Classification[]> {
    return this.classificationService.listAll();
  }
}
