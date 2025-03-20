import { Hono } from "hono";
import type { auth } from "../utils/auth";
import { db } from "../db";
import { user as userTable } from "../db/schema";
import { eq } from "drizzle-orm";

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
