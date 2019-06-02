import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteUser: async (_, { id }, ___) => {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error("does not exist");
      }

      const users = await User.find();

      if (users.length < 2) {
        throw new Error("can't delete last user");
      }

      await User.remove(user);

      return true;
    }
  }
};
