import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "src/config";

const queryClient = postgres(config.database);
export const db = drizzle(queryClient);
