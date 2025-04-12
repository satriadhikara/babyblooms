import { desc } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  primaryKey,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

// ================================
// Enums for various fields
// ================================

export const genderEnum = pgEnum("gender", ["male", "female", "unknown"]);
// export const safeStatusEnum = pgEnum('safe_status', ['safe', 'caution', 'small_portion', 'unsafe']);
export const activityCategoryEnum = pgEnum("activity_category", [
  "Terkait Bepergian",
  "Olahraga",
  "Kesehatan",
  "Hiburan",
  "Fashion",
  "Rumah Tangga",
  "Gerakan Tubuh",
  "Kecantikan & Kosmetik",
  "Perawatan Rambut",
]);
export const medicineCategoryEnum = pgEnum("medicine_category", [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]);
export const postCategoryEnum = pgEnum("post_category", [
  "pregnancyQNA",
  "tipsAndRecommendations",
  "lifestyle",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  // Added role field
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
  gender: genderEnum("gender").notNull(),
  // firstDayOfMenstruation: timestamp("first_day_of_menstruation"),
  // dateOfConception: timestamp("date_of_conception"),
  // Unique connection code which can be shared with a guardian.
  connectionCode: text("connection_code").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
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

export const activity = pgTable("activity", {
  id: text("id").primaryKey(),
  category: activityCategoryEnum("category").notNull(),
  title: text("title"),
  imageUrl: text("image_url"),
  isSafe: boolean("is_safe"),
});

export const medicine = pgTable("medicine", {
  id: text("id").primaryKey(),
  name: text("name"),
  category: medicineCategoryEnum("category").notNull(),
  description: text("description"),
  isSafe: boolean("is_safe"),
});

// export const food = pgTable("food", {
// 	id: text("id").primaryKey(),
// 	name: text("name").notNull(),
// 	safeStatus: safeStatusEnum("safe_status").notNull(),
// 	imageUrl: text("image_url"),
// 	nutrition: text("nutrition"),
// 	category: text("category").notNull(),
// 	descriptionTitle: text("description_title"),
// 	description: text("description"),
// });

// Update post table to include category
export const post = pgTable("post", {
  id: text("id").primaryKey(),
  // The user who created the post.
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content"),
  category: postCategoryEnum("category").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Create comments table
export const comment = pgTable("comment", {
  id: text("id").primaryKey(),
  // The post this comment belongs to
  postId: text("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  // The user who created the comment
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // The content of the comment
  content: text("content").notNull(),
  // Comment can reference another comment (for replies)
  parentId: text("parent_id").references((): AnyPgColumn => comment.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Create likes table (for posts)
export const postLike = pgTable(
  "post_like",
  {
    // Composite primary key of userId and postId
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) =>
    // Create a composite primary key to ensure a user can only like a post once
    [primaryKey({ columns: [table.userId, table.postId] })]
);

// Create  likes table (for comments)
export const commentLike = pgTable(
  "comment_like",
  {
    // Composite primary key of userId and commentId
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    commentId: text("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) =>
    // Create a composite primary key to ensure a user can only like a comment once
    [primaryKey({ columns: [table.userId, table.commentId] })]
);

export const dailyBook = pgTable("daily_book", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  motherId: text("mother_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
