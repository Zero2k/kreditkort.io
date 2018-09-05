import { getConnectionOptions, createConnection } from "typeorm";

export const dbConnect = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};