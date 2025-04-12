import { Hono } from "hono";
import { authRoute } from "./routes/auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./utils/auth";
import { userRoute } from "./routes/user";
import { postRoute } from "./routes/post";
import { app as activityRoute } from "./routes/activity";
import { bookRoute } from "./routes/book";
import { obat } from "./routes/medicine";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.use(logger());
app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "exp://", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.get("/health", (c) => c.json({ status: "ok" }));
app.route("/auth", authRoute);
app.route("/user", userRoute);
app.route("/post", postRoute);
app.route("/", activityRoute);
app.route("/book", bookRoute);
app.route("/medicine", obat);

export default app;
