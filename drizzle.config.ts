import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/database/schema.ts",
  out: "./src/server/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/cinora",
  },
} satisfies Config;