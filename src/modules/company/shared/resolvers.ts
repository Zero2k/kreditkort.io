import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Company: {
    creditcards: async ({ id }, __, ___) => {
      return Creditcard.find({ where: { companyId: id } });
    }
  }
};
