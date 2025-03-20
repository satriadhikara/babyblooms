import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// =========================================
// Existing Tables (with an added "role" field)
// =========================================

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	// New field to store the user's role.
	role: text("role"),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

// =========================================
// New Tables for Pregnancy/Mother-Guardian Features
// =========================================

// Table to store the pregnancy (child) details for mothers.
export const child = pgTable("child", {
	id: text("id").primaryKey(),
	// Link this record to a mother in the "user" table.
	motherId: text("mother_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	// Child/pregnancy details.
	name: text("name").notNull(),
	estimatedDateOfBirth: timestamp("estimated_date_of_birth").notNull(),
	firstDayOfMenstruation: timestamp("first_day_of_menstruation").notNull(),
	dateOfConception: timestamp("date_of_conception").notNull(),
	// Unique connection code which can be shared with a guardian.
	connectionCode: text("connection_code").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	// Optionally, if each mother can have only one active child record:
	// You could enforce uniqueness on "motherId" here.
});

// Table for mapping guardian users to their connected mother.
export const guardian = pgTable("guardian", {
	id: text("id").primaryKey(),
	// The guardian's user id.
	guardianUserId: text("guardian_user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	// The mother's user id to which the guardian is connected.
	motherId: text("mother_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	// Timestamp when the connection was made.
	connectedAt: timestamp("connected_at").notNull(),
});
