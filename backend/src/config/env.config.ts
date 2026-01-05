export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  MONGO_URL: process.env.MONGO_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CAT_API_KEY: process.env.CAT_API_KEY!,
  CAT_API_URL: process.env.CAT_API_URL!,
};
