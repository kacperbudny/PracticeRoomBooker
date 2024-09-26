import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import z from "zod";

const configSchema = z.object({
  environment: z.enum(["dev", "prod", "local"]),
  database: z.object({
    database: z.string(),
    user: z.string(),
    password: z.string(),
    host: z.string(),
    port: z.number(),
  }),
  session: z.object({
    secretKey: z.instanceof(Buffer),
  }),
});

export const config = configSchema.parse({
  environment: process.env.ENVIRONMENT as "dev" | "prod" | "local",
  database: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
  session: {
    secretKey: readFileSync(join(__dirname, "secret-key")),
  },
});
