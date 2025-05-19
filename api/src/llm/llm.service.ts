import { Injectable } from '@nestjs/common';
import { parseResponse } from '../utils/functions/llm-helpers';
import { chat } from '../utils/functions/cohere-helpers';
import { UpdateTranscriptionDto } from '../transcription/dto/update.dto';

@Injectable()
export class LLMService {
  constructor() {}

  async classifyTranscription(
    transcription: string,
  ): Promise<UpdateTranscriptionDto> {
    try {
      const schema: Record<string, unknown> = {
        type: 'object',
        properties: {
          business_line: { type: 'string' },
          business_stage: { type: 'string' },
          mean_consultations_per_day: { type: 'integer' },
          how_came_to_vambe: { type: 'string' },
          problem: { type: 'string' },
          reasons: { type: 'string' },
          expectations: { type: 'string' },
        },
        required: [
          'business_line',
          'business_stage',
          'mean_consultations_per_day',
          'how_came_to_vambe',
          'problem',
          'reasons',
          'expectations',
        ],
      };

      const jsonResponse = await chat(
        'Analiza la transcripción e identifica las dimensiones del schema. Si no identificas alguna dimensión, déjalo en null.',
        transcription,
        'json_object',
        schema,
      );

      const parsedResponse = await parseResponse(jsonResponse);

      const updateData: UpdateTranscriptionDto = {
        business_line: parsedResponse.business_line || undefined,
        business_stage: parsedResponse.business_stage || undefined,
        daily_consultations: parsedResponse.daily_consultations || undefined,
        how_came_to_vambe: parsedResponse.how_came_to_vambe || undefined,
        problem: parsedResponse.problem || undefined,
        reasons: parsedResponse.reasons || undefined,
        expectations: parsedResponse.expectations || undefined,
      };

      return updateData;
    } catch (error) {
      console.error('Error en classifyTranscription:', error);
      throw new Error('Error al clasificar la transcripción');
    }
  }
}
