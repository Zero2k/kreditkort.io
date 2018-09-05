import "reflect-metadata";
import "dotenv/config";
import { GraphQLServer } from "graphql-yoga";
import * as session from "express-session";

import { dbConnect } from "./utils/dbConnect";
import { createSchema } from "./utils/createSchema";

export const createServer = async () => {
  const server = new GraphQLServer({
    schema: createSchema() as any,
    context: ({ request }) => ({
      session: request.session,
      url: request.protocol + "://" + request.get("host"),
      req: request
    })
  });

  server.express.use(
    session({
      /* store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }), */
      name: "qid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  await dbConnect();

  const app = await server.start({
    cors,
    port: 3000
  });
  console.log("Server is running on localhost:3000");

  return app;
};
