import { getConnectionOptions, createConnection } from "typeorm";

import { User } from "../entity/User";
import { Company } from "../entity/Company";
import { Creditcard } from "../entity/Creditcard";
import { Post } from "../entity/Post";

export const dbConnect = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        entities: [User, Company, Creditcard, Post],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
