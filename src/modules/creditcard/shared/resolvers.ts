import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Creditcard: {
    company: async ({ companyId }, __, ___) => {
      return Company.findOne({ where: { id: companyId } });
    },
    markdown: async ({ information }, __, ___) => {
      if (information) {
        return parseMd(information);
      }

      return null;
    }
  }
};
