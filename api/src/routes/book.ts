import { Hono } from "hono";
import { auth } from "../utils/auth";
import { dailyBook, guardian, user as userTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { randomUUIDv7 } from "bun";

export const bookRoute = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

bookRoute.get("/", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    let motherId = user.id;
    // Check roles
    if (user.role !== "mom") {
      const [resp] = await db
        .select()
        .from(guardian)
        .where(eq(guardian.guardianUserId, user.id));
      if (!resp) {
        return c.json({ error: "Guardian not found" }, 404);
      }
      motherId = resp.motherId;
    }

    const books = await db
      .select({
        id: dailyBook.id,
        content: dailyBook.content,
        createdAt: dailyBook.createdAt,
        userId: userTable.id,
        name: userTable.name,
        imageUrl: userTable.image,
      })
      .from(dailyBook)
      .fullJoin(userTable, eq(dailyBook.userId, userTable.id))
      .where(eq(dailyBook.motherId, motherId));

    return c.json(books, 200);
  } catch (error) {
    console.error("Error fetching books:", error);
    return c.json({ error: "Failed to fetch books" }, 500);
  }
});

bookRoute.post(
  "/",
  zValidator(
    "json",
    z.object({
      content: z.string(),
    })
  ),
  async (c) => {
    const session = c.get("session");
    const user = c.get("user");
    const validated = c.req.valid("json");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      let motherId: string;
      if (user.role === "mom") {
        motherId = user.id;
      } else {
        const guardianRecord = await db
          .select({ motherId: guardian.motherId })
          .from(guardian)
          .where(eq(guardian.guardianUserId, user.id))
          .limit(1);

        if (!guardianRecord || guardianRecord.length === 0) {
          return c.json({ error: "Guardian relationship not found" }, 404);
        }
        motherId = guardianRecord[0].motherId;
      }

      const uuid = randomUUIDv7("base64url");

      const [newBook] = await db
        .insert(dailyBook)
        .values({
          id: uuid,
          content: validated.content,
          motherId: motherId,
          userId: user.id,
          createdAt: new Date(),
        })
        .returning();

      return c.json(newBook, 201);
    } catch (error) {
      console.error("Error creating book:", error);
      return c.json({ error: "Failed to create book" }, 500);
    }
  }
);
