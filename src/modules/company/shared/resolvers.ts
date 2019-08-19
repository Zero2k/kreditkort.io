import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
var md = require("markdown-it")();

export const resolvers: ResolverMap = {
  Company: {
    creditcards: async ({ id }, { limit = 10, offset = 0 }, ___) => {
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
        return md.render(about);
      }

      return null;
    }
  }
};
