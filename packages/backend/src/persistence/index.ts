import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "../config";
import * as schema from "./schema";

const migrationClient = postgres({
  max: 1,
  ...config.database,
});
await migrate(drizzle(migrationClient, { schema }), {
  migrationsFolder: "./migrations",
});

// for query purposes
const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
const db = drizzle(queryClient);
