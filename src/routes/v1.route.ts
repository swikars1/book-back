import Elysia from "elysia";
import { bookRoutes } from "./book.route";
import { authorRoutes } from "./author.route";

//combine all routes here
export const v1Routes = new Elysia({ prefix: "/v1" })
  .use(bookRoutes)
  .use(authorRoutes);
