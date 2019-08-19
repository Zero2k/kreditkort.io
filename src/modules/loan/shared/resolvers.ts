import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";

var md = require("markdown-it")();

export const resolvers: ResolverMap = {
  Loan: {
    company: async ({ companyId }, __, ___) => {
      return Loan.findOne({ where: { id: companyId } });
    },
    markdown: async ({ information }, __, ___) => {
      if (information) {
        return md.render(information);
      }

      return null;
    }
  }
};
