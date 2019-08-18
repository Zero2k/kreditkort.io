import { ResolverMap } from "../../../types/graphql-utils";
import { Loan } from "../../../entity/Loan";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Loan: {
    company: async ({ companyId }, __, ___) => {
      return Loan.findOne({ where: { id: companyId } });
    },
    markdown: async ({ information }, __, ___) => {
      if (information) {
        return parseMd(information);
      }

      return null;
    }
  }
};
