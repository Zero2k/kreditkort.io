import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Company: {
    creditcards: async ({ id }, 
      {
        limit = 10,
        offset = 0
      }, ___) => {
      return Creditcard.find({
        where: { companyId: id },
        order: {
          interest: "ASC"
        },
        skip: offset,
        take: limit
      });
    },
    markdown: async ({ about }, __, ___) => {
      if (about) {
        return parseMd(about);
      }

      return null;
    }
  }
};
