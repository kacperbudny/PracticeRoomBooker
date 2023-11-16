import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const migrationClient = postgres({
  max: 1,
  database: "postgres",
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
});
// migrate(drizzle(migrationClient), ...)

// for query purposes
const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
const db = drizzle(queryClient);
