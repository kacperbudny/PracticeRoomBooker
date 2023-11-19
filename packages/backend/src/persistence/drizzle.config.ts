import type { Config } from "drizzle-kit";
import "dotenv/config";
import { config } from "src/config";

export default {
  schema: "./src/persistence/schema.ts",
  out: "./src/persistence/migrations",
  driver: "pg",
  dbCredentials: { ...config.database },
} satisfies Config;
