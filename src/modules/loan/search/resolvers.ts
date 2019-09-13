import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Loan } from "../../../entity/Loan";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchLoan: async (
      _,
      { input: { amount, term, loan_type, filter }, limit = 10, offset = 0 },
      ___
    ) => {
      let loanQB = await getConnection()
        .getRepository(Loan)
        .createQueryBuilder("loan")
        .leftJoinAndSelect(Company, "company", "company.id = loan.companyId");
      if (amount) {
        loanQB = loanQB.andWhere("loan.amount_max >= :amount", {
          amount
        });
      }
      if (term) {
        loanQB = loanQB.andWhere("loan.term_max >= :term", {
          term
        });
      }
      if (loan_type) {
        loanQB = loanQB.andWhere(":loan_type = loan.loan_type", {
          loan_type
        });
      }
      if (filter.uc) {
        loanQB = loanQB.andWhere("loan.without_uc = :without_uc", {
          without_uc: filter.uc
        });
      }
      if (filter.ga) {
        loanQB = loanQB.andWhere("loan.bad_credit = :bad_credit", {
          bad_credit: filter.ga
        });
      }
      if (filter.ki) {
        loanQB = loanQB.andWhere("loan.require_income = :require_income", {
          require_income: filter.ki
        });
      }
      if (filter.lf) {
        loanQB = loanQB.andWhere("loan.loan_broker = :loan_broker", {
          loan_broker: filter.lf
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
        .addOrderBy("loan.interest_max", "ASC")
        .getMany();
    }
  }
};
