import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Query: {
    findCompany: async (
      _,
      { input: { id } },
      ___
    ) => {
      return Company.findOne({
        where: { id },
        order: {
          name: "ASC"
        }
      });
    },

    findCompanyBySlug: async (
      _,
      { input: { slug } },
      ___
    ) => {
      return Company.findOne({
        where: { slug }
      });
    }
  }
};
