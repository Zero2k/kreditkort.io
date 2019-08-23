import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";

export const resolvers: ResolverMap = {
  Mutation: {
    createLoan: async (_, { input: { ...data } }, { session }) => {
      await Loan.create({
        ...data,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
