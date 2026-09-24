import "dotenv/config";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required to run migrations.");

const client = postgres(connectionString, { max: 1 });
await migrate(drizzle(client), { migrationsFolder: "./src/server/database/migrations" });
await client.end();