import "dotenv/config";
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
    secretKey: z.string(),
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
    secretKey: process.env.SESSION_SECRET_KEY,
  },
});
