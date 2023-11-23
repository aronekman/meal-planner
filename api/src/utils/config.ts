export default {
  port: process.env.PORT ?? 8000,
  mongoDbUrl: process.env.MONGODB_URI ?? '',
  dbName: process.env.DB_NAME ?? 'meal-planner',
  atSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  rtSecret: process.env.REFRESH_TOKEN_SECRET ?? '',
  atLifeTime: process.env.ACCESS_TOKEN_LIFETIME ?? '10m',
  rtLifeTime: process.env.REFRESH_TOKEN_LIFETIME ?? '1d',
  apiNinjasKey: process.env.API_NINJAS_KEY ?? ''
} as const;
