export const configLoader = () => ({
  nodeEnv: process.env.NODE_ENV,
  apiKeys: process.env.APP_KEYS?.split(',') ?? [],
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '5432',
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') ?? [
    'http://localhost:3004',
    'http://web:3000',
    'http://localhost:80',
    'http://localhost',
    'http://api:3000',
    'http://localhost:3003',
  ],
});
