import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Company: {
    creditcards: async ({ id }, __, ___) => {
      return Creditcard.find({
        where: { companyId: id },
        order: {
          name: "ASC"
        }
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
