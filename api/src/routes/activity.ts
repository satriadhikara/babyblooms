import { Hono } from "hono";
import { db } from "../db";
import { activity } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, like } from "drizzle-orm";

const app = new Hono();

// Get all activities
app.get("/", async (c) => {
  try {
    const activities = await db.select().from(activity);
    
    return c.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return c.json({ 
      success: false, 
      message: "Failed to fetch activities" 
    }, 500);
  }
});

// Get activities by category
app.get("/category/:category", async (c) => {
  const category = c.req.param("category");
  
  try {
    // Type assertion to tell TypeScript that category is one of the valid enum values
    const activities = await db
      .select()
      .from(activity)
      .where(eq(activity.category, category as any));
    
    return c.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error(`Error fetching activities for category ${category}:`, error);
    return c.json({ 
      success: false, 
      message: "Failed to fetch activities" 
    }, 500);
  }
});

// Search activities
app.get("/search", async (c) => {
  const query = c.req.query("query") || "";
  
  try {
    const activities = await db
      .select()
      .from(activity)
      .where(
          like(activity.title, `%${query}%`)
      );
    
    return c.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error("Error searching activities:", error);
    return c.json({ 
      success: false, 
      message: "Failed to search activities" 
    }, 500);
  }
});

export default app;