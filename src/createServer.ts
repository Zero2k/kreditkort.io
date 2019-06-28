import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import * as http from "http";
import * as path from "path";

import { dbConnect } from "./utils/dbConnect";
import { createSchema } from "./utils/createSchema";
import { middleware } from "./middleware";
import { redis } from "./redis";

const RedisStore = connectRedis(session as any);

export const createServer = async () => {
  const schema = createSchema() as any;
  applyMiddleware(schema, middleware);

  const apolloServer = new ApolloServer({
    subscriptions: {
      path: "/subscriptions"
    },
    schema,
    context: ({ req, res }: any) => ({
      redis,
      session: req ? req.session : undefined,
      url: req ? req.protocol + "://" + req.get("host") : "",
      req,
      res
    })
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_HOST
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: "sess:"
      }),
      name: "qid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        /* REQUIRES SSL */
        /* secure: process.env.NODE_ENV === "production", */
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    } as any)
  );

  app.use("/static", express.static(path.resolve(__dirname, "../public")));

  await dbConnect();

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: "/graphql"
  });

  const port = process.env.SERVER_PORT;
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });

  return app;
};
