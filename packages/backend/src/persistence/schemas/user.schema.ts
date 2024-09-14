import { pgSchema } from "drizzle-orm/pg-core";
import { uuid, varchar } from "drizzle-orm/pg-core";

export const schema = pgSchema("booker");

export const userRole = schema.enum("role", ["user", "admin"]);

export const users = schema.table("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole("role").notNull().default("user"),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
