import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL is required in production.");
}

const client = postgres(connectionString ?? "postgresql://localhost:5432/cinora", { prepare: false });
export const db = drizzle(client, { schema });