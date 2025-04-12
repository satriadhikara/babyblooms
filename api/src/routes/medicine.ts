import { Hono } from "hono";
import { db } from "../db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, like } from "drizzle-orm";
import { medicine } from "../db/schema";
import { medicineCategoryEnum } from "../db/schema";

export const obat = new Hono();

// Get by category
obat.get("/category/:category", async (c) => {
  const category = c.req.param("category") as (typeof medicineCategoryEnum)[keyof typeof medicineCategoryEnum];
  try {
    const medicines = await db
      .select()
      .from(medicine)
      .where(eq(medicine.category, category as any));
    return c.json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    console.error(`Error fetching medicines for category ${category}:`, error);
    return c.json({ success: false, message: "Failed to fetch medicines" }, 500);
  }
});

// get by search
obat.get("/search", async (c) => {
  const query = c.req.query("query") || "";
  try {
    const medicines = await db
      .select()
      .from(medicine)
      .where(
        like(medicine.name, `%${query}%`)
      );
    return c.json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    console.error(`Error fetching medicines for query ${query}:`, error);
    return c.json({ success: false, message: "Failed to fetch medicines" }, 500);
  }
});
