CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'unknown');--> statement-breakpoint
ALTER TABLE "child" ADD COLUMN "gender" "gender" NOT NULL;