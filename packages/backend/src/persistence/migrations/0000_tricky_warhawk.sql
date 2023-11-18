CREATE SCHEMA "booker";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booker"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(20) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
