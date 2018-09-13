import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";

export const resolvers: ResolverMap = {
  Mutation: {
    createCreditcard: async (_, { input: { ...data } }, { session }) => {
      const creditcard = await Creditcard.create({
        ...data,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
