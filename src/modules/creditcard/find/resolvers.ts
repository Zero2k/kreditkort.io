import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

import {
  priority,
  totalRating,
  insuranceRating
} from "../../../utils/customSelects";

export const resolvers: ResolverMap = {
  Query: {
    findCreditcard: async (_, { input: { id } }, ___) => {
      return Creditcard.findOne({
        where: { id }
      });
    },

    findCreditcardBySlug: async (_, { input: { slug } }, ___) => {
      return Creditcard.findOne({
        where: { slug }
      });
    },

    findCreditcardByLowestInterest: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy("priority", "ASC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardByHighestCredit: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy("priority", "ASC")
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardWithoutFee: async (_, { limit = 10, offset = 0 }, __) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.andWhere("card.annual_fee = 0");
      creditcardQB.addSelect(totalRating, "rating");
      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy({
          rating: "DESC",
          priority: "ASC"
        })
        .addOrderBy("amount_max", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardInterestFree: async (_, { limit = 10, offset = 0 }, __) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .addOrderBy("interest_free", "DESC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardWithoutWithdrawalFee: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.andWhere("card.withdrawal_fee = 0");
      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy("priority", "ASC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardWithoutExchangeFee: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.andWhere("card.exchange_rate = 0");
      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy("priority", "ASC")
        .addOrderBy("interest", "ASC")
        .getMany();
    },

    findCreditcardWithMostInsurances: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      let creditcardQB = await getConnection()
        .getRepository(Creditcard)
        .createQueryBuilder("card");

      creditcardQB.addSelect("array_length(card.insurances, 1) as count");
      creditcardQB.andWhere("array_length(card.insurances, 1) > 0");
      creditcardQB.addSelect(insuranceRating, "rating");
      creditcardQB.addSelect(priority, "priority");

      return creditcardQB
        .take(limit)
        .skip(offset)
        .groupBy("card.id")
        .orderBy({
          rating: "DESC",
          priority: "ASC"
        })
        .addOrderBy("count", "DESC")
        .getMany();
    }
  }
};
