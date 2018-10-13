import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    findCreditcardByLowestInterest: async (
      _,
      {
        limit = 10,
        offset = 0
      }: GQL.IFindCreditcardByLowestInterestOnQueryArguments,
      __
    ) => {
      return Creditcard.find({
        order: {
          interest: "ASC"
        },
        skip: offset,
        take: limit
      });
    },

    findCreditcardByHighestCredit: async (
      _,
      {
        limit = 10,
        offset = 0
      }: GQL.IFindCreditcardByHighestCreditOnQueryArguments,
      __
    ) => {
      return Creditcard.find({
        order: {
          amount_max: "DESC"
        },
        skip: offset,
        take: limit
      });
    }
  }
};
