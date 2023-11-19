import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "src/config";

const migrationClient = postgres({
  max: 1,
  ...config.database,
});

const db = drizzle(migrationClient);

migrate(db, {
  migrationsFolder: "src/persistence/migrations",
}).then(() => migrationClient.end());
