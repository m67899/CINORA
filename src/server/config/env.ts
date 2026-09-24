import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url().optional(),
  OTP_PROVIDER: z.string().default("unconfigured"),
  TELEGRAM_BOT_TOKEN: z.string().min(1).optional(),
  RUBIKA_API_TOKEN: z.string().min(1).optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  OTP_PROVIDER: process.env.OTP_PROVIDER,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || undefined,
  RUBIKA_API_TOKEN: process.env.RUBIKA_API_TOKEN || undefined,
});