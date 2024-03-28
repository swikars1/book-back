import { logger } from "@bogeychan/elysia-logger";
import Elysia from "elysia";
import pretty from "pino-pretty";
import { env } from "./config";
import { PrismaClient } from "@prisma/client";

const stream = pretty({
  colorize: true,
});

export const prisma = new PrismaClient();

const loggerConfig =
  env.NODE_ENV === "development"
    ? {
        level: "debug",
        stream,
      }
    : { level: "info" };

export const context = new Elysia({ name: "initial_ctx_setup" })
  .decorate("db", prisma)
  .decorate("env", env)
  .state<{ messages: string[] }>({
    messages: [],
  })
  .use(logger(loggerConfig));
