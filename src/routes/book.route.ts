import Elysia, { t } from "elysia";
import { context } from "../context";
import { Prisma } from "@prisma/client";

export const bookRoutes = new Elysia({ prefix: "/books" })
  .use(context)
  .get("/count", async ({ db }) => {
    return {
      totalBooks: await db.book.count(),
    };
  })
  .get(
    "/list",
    async ({ db, query }) => {
      const PAGE_SIZE = 12;
      const pagination: Prisma.BookFindManyArgs = {
        skip: PAGE_SIZE * (+query.page - 1),
        take: PAGE_SIZE,
      };
      const select: Prisma.BookSelect = {
        id: true,
        name: true,
        author: {
          select: {
            name: true,
          },
        },
        description: true,
      };

      const orderBy: Prisma.BookFindFirstArgs["orderBy"] = {
        createdAt: "desc",
      };

      if (!query.q) {
        return await db.book.findMany({ select, orderBy, ...pagination });
      }

      const where: Prisma.BookWhereInput = {
        OR: [
          {
            name: {
              contains: query.q,
            },
          },
          {
            author: {
              name: {
                contains: query.q,
              },
            },
          },
        ],
      };

      return await db.book.findMany({
        select,
        where,
        orderBy,
        ...pagination,
      });
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
        page: t.Numeric(),
      }),
    }
  )
  .post(
    "/",
    async ({ db, body }) => {
      return await db.book.create({
        data: {
          name: body.name,
          description: body.description,
          author: {
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
        name: t.String({
          minLength: 2,
          maxLength: 50,
        }),
        author: t.String({
          minLength: 2,
          maxLength: 50,
        }),
        description: t.String({
          maxLength: 150,
        }),
      }),
      error({ code, error }) {
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
  .delete(
    "/:id",
    async ({ params, db }) => {
      return await db.book.delete({
        where: {
          id: Number(params.id),
        },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      error({ code, error }) {
        switch (code) {
          case "VALIDATION":
            return {
              ...error,
              readableError: "Delete error. Book not found.",
            };
            break;
          default:
            return {
              ...error,
              readableError: "Something went wrong while deleting a book.",
            };
            break;
        }
      },
    }
  );
