export const configLoader = () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiKeys: process.env.APP_KEYS?.split(',') ?? [],
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '5432',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME ?? 'development_db',
    synchronize: process.env.SYNCHRONIZE === 'true',
  },
  port: process.env.PORT ?? 3000,
  cohere: {
    apiKey: process.env.COHERE_API_KEY,
    model: process.env.COHERE_MODEL ?? 'command-r-plus',
  },
});
