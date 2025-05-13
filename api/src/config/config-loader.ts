export const configLoader = () => ({
  nodeEnv: process.env.NODE_ENV,
  apiKeys: process.env.APP_KEYS?.split(',') ?? [],
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '5432',
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.SYNCHRONIZE === 'true',
  },
  port: process.env.PORT,
  cohere: {
    apiKey: process.env.COHERE_API_KEY,
  },
});

export const configOptions = {
  load: [configLoader],
  isGlobal: true,
};
