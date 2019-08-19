import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
var md = require("markdown-it")();

export const resolvers: ResolverMap = {
  Creditcard: {
    company: async ({ companyId }, __, ___) => {
      return Company.findOne({ where: { id: companyId } });
    },
    markdown: async ({ information }, __, ___) => {
      if (information) {
        return md.render(information);
      }

      return null;
    }
  }
};
