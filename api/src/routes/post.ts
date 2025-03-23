import { Hono } from "hono";
import type { auth } from "../utils/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  post,
  comment,
  postLike,
  commentLike,
  user as userTable,
} from "../db/schema";
import { randomUUIDv7 } from "bun";
import { db } from "../db";
import { count, eq, sql, desc } from "drizzle-orm";

export const postRoute = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  // Convert to minutes, hours, days
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m lalu`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}j lalu`;
  }
  return `${diffInDays}h lalu`;
}

function mapCategoryToDisplay(category: string): string {
  switch (category) {
    case "pregnancyQNA":
      return "Pregnancy Q&A";
    case "tipsAndRecommendations":
      return "Tips & Rekomendasi";
    case "lifestyle":
      return "Gaya Hidup";
    default:
      return category;
  }
}

postRoute.get(
  "/",
  zValidator(
    "query",
    z.object({
      category: z
        .enum(["pregnancyQNA", "tipsAndRecommendations", "lifestyle"])
        .optional(),
    })
  ),
  async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { category } = c.req.valid("query");

    try {
      // First, fetch the posts with order by createdAt DESC to get latest first
      const postsQuery = db
        .select()
        .from(post)
        .where(category ? eq(post.category, category) : undefined)
        .orderBy(desc(post.createdAt)); // Add this line to sort by creation date, newest first

      const posts = await postsQuery;

      // For each post, get the like count, comment count, and user details
      const postsWithStats = await Promise.all(
        posts.map(async (p) => {
          // Get likes count
          const likesCount = await db
            .select({ count: count() })
            .from(postLike)
            .where(eq(postLike.postId, p.id))
            .then((result) => Number(result[0].count));

          // Get comments count
          const commentsCount = await db
            .select({ count: count() })
            .from(comment)
            .where(eq(comment.postId, p.id))
            .then((result) => Number(result[0].count));

          // Check if the current user liked this post
          const userLiked = await db
            .select()
            .from(postLike)
            .where(
              sql`${postLike.userId} = ${user.id} AND ${postLike.postId} = ${p.id}`
            )
            .then((result) => result.length > 0);

          const [postOwner] = await db
            .select({
              ownerName: userTable.name,
              profileImage: userTable.image,
            })
            .from(userTable)
            .where(eq(userTable.id, p.userId));

          // Calculate time ago
          const timeAgo = getTimeAgo(p.createdAt);

          // Map category from database value to display value
          const categoryDisplay = mapCategoryToDisplay(p.category);

          // Return post with formatted response
          return {
            id: p.id,
            author: postOwner.ownerName,
            timeAgo: timeAgo,
            title: p.title,
            content: p.content,
            likes: likesCount,
            comments: commentsCount,
            category: categoryDisplay,
            avatar: postOwner.profileImage,
            userLiked: userLiked,
          };
        })
      );

      return c.json(postsWithStats, 200);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return c.json({ error: "Failed to fetch posts" }, 500);
    }
  }
);

postRoute.get("/personal", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const posts = await db
      .select()
      .from(post)
      .where(eq(post.userId, user.id))
      .orderBy(desc(post.createdAt));

    // For each post, get the like count and comment count
    const postsWithStats = await Promise.all(
      posts.map(async (p) => {
        // Get likes count
        const likesCount = await db
          .select({ count: count() })
          .from(postLike)
          .where(eq(postLike.postId, p.id))
          .then((result) => Number(result[0].count));

        // Get comments count
        const commentsCount = await db
          .select({ count: count() })
          .from(comment)
          .where(eq(comment.postId, p.id))
          .then((result) => Number(result[0].count));

        // Check if the current user liked this post
        const userLiked = await db
          .select()
          .from(postLike)
          .where(
            sql`${postLike.userId} = ${user.id} AND ${postLike.postId} = ${p.id}`
          )
          .then((result) => result.length > 0);

        // Calculate time ago
        const timeAgo = getTimeAgo(p.createdAt);

        // Map category from database value to display value
        const categoryDisplay = mapCategoryToDisplay(p.category);

        // Return post with formatted response
        return {
          id: p.id,
          timeAgo: timeAgo,
          title: p.title,
          content: p.content,
          likes: likesCount,
          comments: commentsCount,
          category: categoryDisplay,
          userLiked: userLiked,
        };
      })
    );

    return c.json(postsWithStats, 200);
  } catch (error) {
    console.error("Error fetching personal posts:", error);
    return c.json({ error: "Failed to fetch personal posts" }, 500);
  }
});

postRoute.post(
  "/",
  zValidator(
    "json",
    z.object({
      title: z.string(),
      content: z.string(),
      category: z.enum(["pregnancyQNA", "tipsAndRecommendations", "lifestyle"]),
    })
  ),
  async (c) => {
    const { title, content, category } = c.req.valid("json");

    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      const postId = randomUUIDv7("base64url");

      await db.insert(post).values({
        id: postId,
        userId: user.id,
        title,
        content,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return c.json({ message: "Post created successfully", postId }, 201);
    } catch (error) {
      console.error("Error creating post:", error);
      return c.json({ error: "Failed to create post" }, 500);
    }
  }
);

postRoute.post(
  "/:postId/like",
  zValidator("param", z.object({ postId: z.string() })),
  async (c) => {
    const session = c.get("session");
    const user = c.get("user");
    const { postId } = c.req.valid("param");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      // Check if the user already liked this post
      const existingLike = await db
        .select()
        .from(postLike)
        .where(
          sql`${postLike.userId} = ${user.id} AND ${postLike.postId} = ${postId}`
        )
        .then((result) => result[0] || null);

      if (existingLike) {
        // User already liked the post, so unlike it
        await db
          .delete(postLike)
          .where(
            sql`${postLike.userId} = ${user.id} AND ${postLike.postId} = ${postId}`
          );

        return c.json(
          { message: "Post unliked successfully", liked: false },
          200
        );
      }
      // User hasn't liked the post, so like it
      await db.insert(postLike).values({
        userId: user.id,
        postId,
        createdAt: new Date(),
      });

      return c.json({ message: "Post liked successfully", liked: true }, 201);
    } catch (error) {
      console.error("Error toggling post like:", error);
      return c.json({ error: "Failed to toggle post like" }, 500);
    }
  }
);

postRoute.get(
  "/:postId/comments",
  zValidator("param", z.object({ postId: z.string() })),
  async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { postId } = c.req.valid("param");

    try {
      const comments = await db
        .select()
        .from(comment)
        .where(eq(comment.postId, postId));

      return c.json(comments, 200);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return c.json({ error: "Failed to fetch comments" }, 500);
    }
  }
);
