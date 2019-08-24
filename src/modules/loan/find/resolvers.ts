import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";

export const resolvers: ResolverMap = {
  Query: {
    findLoan: async (_, { input: { id } }, ___) => {
      return Loan.findOne({
        where: { id }
      });
    }
  }
};
