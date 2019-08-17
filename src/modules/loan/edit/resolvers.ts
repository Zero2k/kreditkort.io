import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Mutation: {
    editLoan: async (
      _,
      { loanId, input: { ...data } }: GQL.IEditLoanOnMutationArguments,
      ___
    ) => {
      await getConnection()
        .createQueryBuilder()
        .update(Loan)
        .set(data)
        .where("id = :id", { id: loanId })
        .returning("*")
        .execute();

      return true;
    }
  }
};
