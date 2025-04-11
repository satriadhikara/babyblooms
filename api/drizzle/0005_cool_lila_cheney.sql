CREATE TYPE "public"."activity_category" AS ENUM('Terkait Bepergian', 'Olahraga', 'Kesehatan', 'Hiburan', 'Fashion', 'Rumah Tangga', 'Gerakan Tubuh', 'Kecantikan & Kosmetik', 'Perawatan Rambut');--> statement-breakpoint
CREATE TYPE "public"."medicine_category" AS ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');--> statement-breakpoint
CREATE TABLE "activity" (
	"id" text PRIMARY KEY NOT NULL,
	"category" "activity_category" NOT NULL,
	"title" text,
	"image_url" text,
	"is_safe" boolean
);
--> statement-breakpoint
CREATE TABLE "medicine" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"category" "medicine_category" NOT NULL,
	"description" text,
	"is_safe" boolean
);
