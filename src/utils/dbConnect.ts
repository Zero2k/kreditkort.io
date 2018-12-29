import { getConnectionOptions ,createConnection } from "typeorm";

export const dbConnect = async (retry = 10) => {
  while (retry) {
    try {
      const connectionOptions = await getConnectionOptions();
      await createConnection({ ...connectionOptions });
      break;
    } catch (err) {
      console.log(err);
      retry -= 1;
      await new Promise(res => setTimeout(res, 10000));
    }
  }
};