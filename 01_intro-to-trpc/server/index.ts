import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

if (!PORT || !JWT_SECRET) {
  throw new Error("Missing PORT or JWT_SECRET in environment variables");
}

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const signUpInputType = z.object({
  email: z.string(),
  password: z.string(),
});

const appRouter = router({

  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const { username } = opts.ctx;

    console.log("Todo Creator : ", username);

    const title = opts.input.title;
    const description = opts.input.description;

    console.log(title, description);

    // Do your db calls here 👇

    return { id: "1" };
  }),

  // A mutation procedure to get user singUp
  signUp: publicProcedure.input(signUpInputType).mutation(async (opts) => {
    const password = opts.input.password;

    // check if user already exists in db,

    const token = jwt.sign({ password }, JWT_SECRET);

    return { token };
  }),
});

// creating the HTTP server
const server = createHTTPServer({
  router: appRouter,
  createContext: (opts) => {
    const authHeader = opts.req.headers["authorization"];

    console.log("AuthHeader : ", authHeader);

    if (authHeader === "Bearer 123") {
      return { username: "Admin" };
    }
    return { username: "Guest" };
  },
});

// starting the server on given port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// type AppRouter = typeof appRouter, exporting the type of appRouter
export type AppRouter = typeof appRouter;

// Here router imported is just like app in express
// And procedure is just like route in express
// In our case the name of route is createTodo
// And mutation means its a POST, PUT, DELETE request

// Three steps for adding authorization context in tRPC
// - create the context while initializing the trpc instance
// - Then check for authorization while creating the http server
// - Finally extract the username from the context in required procedure
