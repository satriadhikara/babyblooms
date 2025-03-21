ALTER TABLE "child" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "child" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "child" DROP COLUMN "first_day_of_menstruation";--> statement-breakpoint
ALTER TABLE "child" DROP COLUMN "date_of_conception";