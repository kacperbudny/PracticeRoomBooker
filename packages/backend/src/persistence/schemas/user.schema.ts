import { pgSchema } from "drizzle-orm/pg-core";
import { uuid, varchar } from "drizzle-orm/pg-core";

export const schema = pgSchema("booker");

export const users = schema.table("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 20 }).notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
