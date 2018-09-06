import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchCreditcard: async (
      _,
      { input: { name, amount }, limit = 10, offset = 0 }
    ) => {
      let creditcardQB = getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");
      if (amount) {
        creditcardQB = creditcardQB.andWhere("card.amount >= :amount", {
          amount
        });
      }
      if (name) {
        creditcardQB = creditcardQB.andWhere("card.name ilike :name", {
          name: `%${name}%`
        });
      }

      return creditcardQB
        .take(limit)
        .skip(offset)
        .getMany();
    }
  }
};
