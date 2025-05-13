import { CohereClientV2 } from 'cohere-ai';
import { configLoader } from './config-loader';

const config = configLoader();

const cohere = new CohereClientV2({
  token: config.cohere.apiKey,
});

export default cohere;