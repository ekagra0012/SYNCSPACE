import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";

const app = new Hono();

const typedLoginSchema = loginSchema;


    app.post(
    "/login",
    zValidator("json", loginSchema),
    (c) => {
        return c.json({ success: "ok" });
    }
);

export default app;