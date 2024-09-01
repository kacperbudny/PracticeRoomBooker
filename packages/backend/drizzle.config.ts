import type { Config } from "drizzle-kit";
import "dotenv/config";
import { config } from "src/config";

export default {
  schema: "./src/persistence/schemas/*",
  out: "./src/persistence/migrations",
  dialect: "postgresql",
  dbCredentials: { ...config.database },
} satisfies Config;
