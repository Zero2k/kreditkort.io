import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    me: async (_, __, { session }) => await User.findOne({ where: { id: session.userId } })
  }
};
