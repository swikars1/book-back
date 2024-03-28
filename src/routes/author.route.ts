import Elysia, { t } from "elysia";
import { context } from "../context";

export const authorRoutes = new Elysia({ prefix: "/author" }).use(context).post(
  "/create",
  async ({ db, body }) => {
    await db.author.create({
      data: {
        name: body.name,
      },
    });
  },
  {
    body: t.Object({
      name: t.String(),
    }),
  }
);
