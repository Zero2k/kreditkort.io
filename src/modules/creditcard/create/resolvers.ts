import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";

export const resolvers: ResolverMap = {
  Mutation: {
    createCreditcard: async (_, { input: { ...data } }, { session }) => {
      const listing = await Creditcard.create({
        ...data
      }).save();

      return true;
    }
  }
};
