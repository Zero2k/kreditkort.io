import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchCreditcard: async (
      _,
      {
        input: { name, amount, interest, card_types, check_uc, bad_credit },
        limit = 10,
        offset = 0
      },
      ___
    ) => {
      let creditcardQB = getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");
      if (name) {
        creditcardQB = creditcardQB.andWhere("card.name ilike :name", {
          name: `%${name}%`
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
        creditcardQB = creditcardQB.andWhere(
          ":card_types = ANY(card.card_types)",
          { card_types }
        );
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
        .orderBy("card.interest", "ASC")
        .getMany();
    }
  }
};
