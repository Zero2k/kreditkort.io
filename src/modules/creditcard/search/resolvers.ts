import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchCreditcard: async (
      _,
      {
        input: {
          name,
          amount,
          label,
          interest,
          card_types,
          check_uc,
          bad_credit
        },
        limit = 10,
        offset = 0
      },
      ___
    ) => {
      let creditcardQB = getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card")
        .leftJoinAndSelect(Company, "company", "company.id = card.companyId");
      if (name) {
        creditcardQB = creditcardQB.andWhere("company.name ilike :name", {
          name: `%${name}%`
        });
      }
      if (label) {
        creditcardQB = creditcardQB.andWhere("card.label like :label", {
          label
        });
      }
      if (amount) {
        creditcardQB = creditcardQB.andWhere("card.amount_min >= :amount", {
          amount
        });
      }
      if (interest) {
        creditcardQB = creditcardQB.andWhere("card.interest <= :interest", {
          interest
        });
      }
      if (card_types) {
        if (card_types === "resekort") {
          creditcardQB = creditcardQB.andWhere(
            ":card_types = ANY(card.card_types)",
            { card_types }
          );
          creditcardQB.andWhere("card.exchange_rate > 0");
          creditcardQB.orderBy("card.exchange_rate", "ASC");
        } else {
          creditcardQB = creditcardQB.andWhere(
            ":card_types = ANY(card.card_types)",
            { card_types }
          );
        }
      }
      if (check_uc) {
        creditcardQB = creditcardQB.andWhere("card.check_uc = :check_uc", {
          check_uc
        });
      }
      if (bad_credit) {
        creditcardQB = creditcardQB.andWhere("card.bad_credit = :bad_credit", {
          bad_credit
        });
      }

      return creditcardQB
        .take(limit)
        .skip(offset)
        .addSelect(
          `(
            CASE 
              WHEN card.interest > 0 THEN 1
              WHEN card.interest = 0 THEN 2
            END
            )`,
          "priority"
        )
        .orderBy("priority", "ASC")
        .addOrderBy("card.interest", "ASC")
        .getMany();
    }
  }
};
