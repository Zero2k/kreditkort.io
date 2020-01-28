import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    findLoan: async (_, { input: { id } }, ___) => {
      return Loan.findOne({
        where: { id }
      });
    },

    findLoanByType: async (
      _,
      { input: { type = "privatlan", limit = 10, offset = 0 } },
      __
    ) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan");

      loanQB.andWhere(":loan_types = ANY(loan.loan_types)", {
        loan_types: type
      });

      return loanQB
        .take(limit)
        .skip(offset)
        .groupBy("loan.id")
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    }
  }
};
