import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchUser: async (
      _,
      { input: { email }, limit = 10, offset = 0 },
      ___
    ) => {
      let userdQB = getConnection()
        .getRepository(User)
        .createQueryBuilder("user");
      if (email) {
        userdQB = userdQB.where("user.email ilike :email", {
          email: `%${email}%`
        });
      }

      return userdQB
        .take(limit)
        .skip(offset)
        .orderBy("user.email", "ASC")
        .getMany();
    }
  }
};
