CREATE TABLE "child" (
	"id" text PRIMARY KEY NOT NULL,
	"mother_id" text NOT NULL,
	"name" text NOT NULL,
	"estimated_date_of_birth" timestamp NOT NULL,
	"first_day_of_menstruation" timestamp NOT NULL,
	"date_of_conception" timestamp NOT NULL,
	"connection_code" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "child_connection_code_unique" UNIQUE("connection_code")
);
--> statement-breakpoint
CREATE TABLE "guardian" (
	"id" text PRIMARY KEY NOT NULL,
	"guardian_user_id" text NOT NULL,
	"mother_id" text NOT NULL,
	"connected_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "child" ADD CONSTRAINT "child_mother_id_user_id_fk" FOREIGN KEY ("mother_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_guardian_user_id_user_id_fk" FOREIGN KEY ("guardian_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_mother_id_user_id_fk" FOREIGN KEY ("mother_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;