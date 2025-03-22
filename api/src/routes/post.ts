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
import { count, eq, sql } from "drizzle-orm";

export const postRoute = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

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
      // First, fetch the posts
      const postsQuery = db
        .select()
        .from(post)
        .where(category ? eq(post.category, category) : undefined);

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

          // Return post with stats and owner details
          return {
            ...p,
            likesCount,
            commentsCount,
            userLiked,
            owner: {
              name: postOwner.ownerName,
              profileImage: postOwner.profileImage,
            },
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
    const posts = await db.select().from(post).where(eq(post.userId, user.id));

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

        return {
          ...p,
          likesCount,
          commentsCount,
          userLiked,
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
      const postId = randomUUIDv7("base64");

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
      const likeId = randomUUIDv7("base64");

      await db.insert(postLike).values({
        userId: user.id,
        postId,
        createdAt: new Date(),
      });

      return c.json({ message: "Post liked successfully", likeId }, 201);
    } catch (error) {
      console.error("Error liking post:", error);
      return c.json({ error: "Failed to like post" }, 500);
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
