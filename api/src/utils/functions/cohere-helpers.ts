import cohere from '../../config/cohere';
import { configLoader } from '../../config/config-loader';
import { ResponseFormatV2 } from 'cohere-ai/api/types/ResponseFormatV2';

const config = configLoader();

export const chat = async (
  prompt: string,
  input: string,
  type: 'text' | 'json_object' = 'text',
  schema?: Record<string, unknown>,
) => {
  const responseFormat = getResponseFormat(type, schema);

  const response = await cohere.chat({
    model: config.cohere.model,
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: input,
      },
    ],
    responseFormat,
  });

  if (!response?.message?.content) {
    throw new Error('No se encontró contenido en la respuesta');
  }

  const text = response.message.content[0].text;

  if (type === 'json_object') {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error('Error al parsear la respuesta');
    }
  }

  return text;
};

const getResponseFormat = (
  type: 'text' | 'json_object' = 'text',
  schema?: Record<string, unknown>,
) => {
  let responseFormat: ResponseFormatV2 | undefined;
  if (type === 'json_object') {
    responseFormat = {
      type,
      jsonSchema: schema,
    };
  } else {
    responseFormat = {
      type,
    };
  }

  return responseFormat;
};
