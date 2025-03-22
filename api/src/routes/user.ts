import { Hono } from "hono";
import type { auth } from "../utils/auth";
import { db } from "../db";
import { user as userTable, child } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { randomUUIDv7 } from "bun";

export const userRoute = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

userRoute.get("/role", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const [userData] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, user.id));

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    if (!userData.role) {
      return c.json({ error: "Role not assigned" }, 422); // 422 Unprocessable Entity - data exists but in incorrect state
    }

    return c.json({ role: userData.role }, 200);
  } catch (error) {
    console.error("Error fetching user role:", error);
    return c.json({ error: "Failed to fetch user role" }, 500);
  }
});

userRoute.post(
  "/momUserData",
  zValidator(
    "json",
    z.object({
      babyName: z.string(),
      // Accept string and transform it to a Date
      hpl: z.string().transform((val) => new Date(val)),
      gender: z.enum(["male", "female", "unknown"]),
    })
  ),
  async (c) => {
    const session = c.get("session");
    const user = c.get("user");
    const validated = c.req.valid("json");

    if (!session || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = randomUUIDv7("base64url");

    const randomCode = `BB${String(Math.floor(Math.random() * 10000)).padStart(
      4,
      "0"
    )}`;

    try {
      const [childData] = await db
        .insert(child)
        .values({
          id,
          name: validated.babyName,
          estimatedDateOfBirth: validated.hpl,
          motherId: user.id,
          connectionCode: randomCode,
          gender: validated.gender,
        })
        .returning();

      await db
        .update(userTable)
        .set({
          role: "mom",
        })
        .where(eq(userTable.id, user.id));

      const hpl = new Date(validated.hpl); // Pastikan HPL dalam format Date
      const hpht = new Date(hpl.getTime() - 280 * 24 * 60 * 60 * 1000); // Mundur 280 hari dari HPL
      const today = new Date();

      const diffInDays = Math.floor(
        (today.getTime() - hpht.getTime()) / (1000 * 3600 * 24)
      );

      const week = Math.floor(diffInDays / 7);
      const day = diffInDays % 7;

      console.log(`Usia kehamilan: ${week} minggu ${day} hari`);

      return c.json({
        week,
        day,
        connectionCode: randomCode,
      });
    } catch (error) {
      console.error("Error inserting child data:", error);
      return c.json({ error: "Failed to insert child data" }, 500);
    }
  }
);
