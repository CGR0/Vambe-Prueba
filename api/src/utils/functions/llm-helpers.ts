import { UpdateTranscriptionDto } from '../../transcription/dto/update.dto';
import { chat } from './cohere-helpers';
import {
  BusinessLine,
  BusinessStage,
  DailyConsultations,
  HowCameToVambe,
} from '../enums';

export async function parseResponse(
  jsonResponse: any,
): Promise<UpdateTranscriptionDto> {
  jsonResponse.business_line = await classifyInput(
    jsonResponse.business_line,
    classifyBusinessLine,
  );
  jsonResponse.business_stage = await classifyInput(
    jsonResponse.business_stage,
    classifyBusinessStage,
  );
  jsonResponse.daily_consultations = await classifyInput(
    jsonResponse.mean_consultations_per_day,
    classifyDailyConsultations,
  );
  jsonResponse.how_came_to_vambe = await classifyInput(
    jsonResponse.how_came_to_vambe,
    classifyHowCameToVambe,
  );
  jsonResponse.problem = checkNullValues(jsonResponse.problem);
  jsonResponse.reasons = checkNullValues(jsonResponse.reasons);
  jsonResponse.expectations = checkNullValues(jsonResponse.expectations);

  return jsonResponse as UpdateTranscriptionDto;
}

async function classifyInput(
  input: string | number,
  classifier: (input: string | number) => Promise<string | undefined>,
) {
  if (checkNullValues(input)) {
    return await classifier(input);
  }
  return undefined;
}

function checkNullValues(input: any) {
  if (input === null || input === undefined) return undefined;
  if (
    typeof input === 'string' &&
    (input.toLowerCase() === 'null' ||
      input.toLowerCase() === 'undefined' ||
      input === '0')
  )
    return undefined;
  if (typeof input === 'number' && input === 0) return undefined;
  return input;
}

const systemPrompt = (dimension: string, options: string[]) => {
  return `Clasifica ${dimension} en una de las siguientes opciones: ${options.join(', ')}`;
};

const classifyBusinessLine = async (input: string) => {
  try {
    return await chat(
      systemPrompt('línea de negocio', Object.values(BusinessLine)),
      input,
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error al clasificar la línea de negocio');
  }
};

const classifyBusinessStage = async (input: string) => {
  try {
    return await chat(
      systemPrompt('stage del negocio', Object.values(BusinessStage)),
      input,
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error al clasificar el stage del negocio');
  }
};

const classifyDailyConsultations = async (input: number) => {
  try {
    return await chat(
      systemPrompt(
        'número de consultas en un día',
        Object.values(DailyConsultations),
      ),
      input.toString(),
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error al clasificar el número de consultas diarias');
  }
};

const classifyHowCameToVambe = async (input: string) => {
  try {
    return await chat(
      systemPrompt('how_came_to_vambe', Object.values(HowCameToVambe)),
      input,
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error al clasificar el how_came_to_vambe');
  }
};
