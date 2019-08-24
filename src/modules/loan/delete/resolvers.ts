import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteLoan: async (_, { id }: GQL.IDeleteLoanOnMutationArguments, ___) => {
      const loan = await Loan.findOne({ where: { id } });

      if (!loan) {
        throw new Error("does not exist");
      }

      await Loan.remove(loan);

      return true;
    }
  }
};
