import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { v1Routes } from "./routes/v1.route";

export const app = new Elysia({ name: "main-app" })
  .use(cors())
  .use(v1Routes)
  .use(swagger())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
