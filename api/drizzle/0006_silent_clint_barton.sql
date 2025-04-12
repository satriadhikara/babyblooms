CREATE TABLE "daily_book" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"mother_id" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_book" ADD CONSTRAINT "daily_book_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_book" ADD CONSTRAINT "daily_book_mother_id_user_id_fk" FOREIGN KEY ("mother_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;