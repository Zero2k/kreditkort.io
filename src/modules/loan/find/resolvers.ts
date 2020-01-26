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

    findPrivateLoan: async (_, { limit = 10, offset = 0 }, __) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan");

      loanQB.andWhere("loan.loan_type = 'privatlan'");

      return loanQB
        .take(limit)
        .skip(offset)
        .groupBy("loan.id")
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findBusinessLoan: async (_, { limit = 10, offset = 0 }, __) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan");

      loanQB.andWhere("loan.loan_type = 'foretagslan'");

      return loanQB
        .take(limit)
        .skip(offset)
        .groupBy("loan.id")
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findDebtConsolidationLoan: async (_, { limit = 10, offset = 0 }, __) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan");

      loanQB.andWhere("loan.loan_type = 'samlingslan'");

      return loanQB
        .take(limit)
        .skip(offset)
        .groupBy("loan.id")
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findLoanProviders: async (_, { limit = 10, offset = 0 }, __) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan");

      loanQB.andWhere("loan.loan_type = 'laneformedlare'");

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
