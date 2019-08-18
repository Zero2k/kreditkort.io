import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Loan } from "../../../entity/Loan";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchLoan: async (
      _,
      {
        input: { amount, interest, loan_types, check_uc, bad_credit },
        limit = 10,
        offset = 0
      },
      ___
    ) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan")
        .leftJoinAndSelect(Company, "company", "company.id = loan.companyId");
      if (amount) {
        loanQB = loanQB.andWhere("loan.amount_min >= :amount", {
          amount
        });
      }
      if (interest) {
        loanQB = loanQB.andWhere("loan.interest <= :interest", {
          interest
        });
      }
      if (loan_types) {
        loanQB = loanQB.andWhere(":loan_types = ANY(loan.loan_types)", {
          loan_types
        });
      }
      if (check_uc) {
        loanQB = loanQB.andWhere("loan.check_uc = :check_uc", {
          check_uc
        });
      }
      if (bad_credit) {
        loanQB = loanQB.andWhere("loan.bad_credit = :bad_credit", {
          bad_credit
        });
      }

      return loanQB
        .take(limit)
        .skip(offset)
        .addSelect(
          `(
            CASE 
              WHEN loan.interest > 0 THEN 1
              WHEN loan.interest = 0 THEN 2
            END
            )`,
          "priority"
        )
        .orderBy("priority", "ASC")
        .addOrderBy("loan.interest", "ASC")
        .getMany();
    }
  }
};
