import { Hono } from "hono";
import { auth } from "../utils/auth";

export const authRoute = new Hono();

authRoute.on(["POST", "GET"], "/*", (c) => {
	return auth.handler(c.req.raw);
});
