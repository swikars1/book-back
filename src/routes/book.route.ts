import Elysia, { t } from "elysia";
import { context } from "../context";

export const bookRoutes = new Elysia({ prefix: "/books" })
  .use(context)
  .get(
    "/search",
    async ({ db, query }) => {
      if (!query.q) {
        return await db.book.findMany();
      }

      return await db.book.findMany({
        where: {
          name: {
            contains: query.q,
          },
        },
      });
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
      }),
    }
  )
  .post(
    "/create",
    async ({ db, body }) => {
      await db.book.create({
        data: {
          name: body.name,
          description: body.description,
          Author: {
            connectOrCreate: {
              where: {
                name: body.author,
              },
              create: {
                name: body.author,
              },
            },
          },
        },
      });
    },
    {
      body: t.Object({
        name: t.String(),
        author: t.String(),
        description: t.String(),
      }),
      error({ code, error }) {
        console.log({ code, error });
        switch (code) {
          case "VALIDATION":
            return {
              ...error,
              readableError: "Incorrect form values while creating a book.",
            };
            break;
          default:
            return {
              ...error,
              readableError: "Something went wrong while creating a book.",
            };
            break;
        }
      },
    }
  )
  .put("/:id", () => "Sign up")
  .delete("/:id", () => "Profile");
