import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";

export const resolvers: ResolverMap = {
  Query: {
    findCreditcard: async (
      _,
      { input: { id } },
      ___
    ) => {
      return Creditcard.findOne({
        where: { id }
      });
    },

    findCreditcardBySlug: async (
      _,
      { input: { slug } },
      ___
    ) => {
      return Creditcard.findOne({
        where: { slug }
      });
    },

    findCreditcardByLowestInterest: async (
      _,
      {
        limit = 10,
        offset = 0
      },
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
      },
      __
    ) => {
      return Creditcard.find({
        order: {
          amount_max: "DESC"
        },
        skip: offset,
        take: limit
      });
    },

    findCreditcardWithoutFee: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      return Creditcard.find({
        where: {
          annual_fee: 0
        },
        order: {
          amount_max: "DESC"
        },
        skip: offset,
        take: limit
      });
    },

    findCreditcardInterestFree: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      return Creditcard.find({
        order: {
          interest_free: "DESC",
          interest: "ASC"
        },
        skip: offset,
        take: limit
      });
    },

    findCreditcardWithoutWithdrawalFee: async (
      _,
      { limit = 10, offset = 0 },
      __
    ) => {
      return Creditcard.find({
        where: {
          withdrawal_fee: 0
        },
        order: {
          interest: "ASC"
        },
        skip: offset,
        take: limit
      });
    }
  }
};
