import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Creditcard: {
    /* logo: (parent, _, { url }) => {
      return parent.logo && `${url}/static/${parent.logo}`;
    }, */
    company: async ({ companyId }, __, ___) => {
      return Company.findOne({ where: { id: companyId } });
    }
  }
};
