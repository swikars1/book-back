import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { v1Routes } from "./routes/v1.route";

export const app = new Elysia({ name: "main-app" })
  .onError(({ code, error }) => {
    // need proper error handling for production
    console.log({ code, error });

    if (code === "VALIDATION")
      return error.validator.Errors(error.value).First().message;
  })
  .use(cors())
  .use(v1Routes)
  .use(swagger())
  .listen(5123);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type TApp = typeof app;
