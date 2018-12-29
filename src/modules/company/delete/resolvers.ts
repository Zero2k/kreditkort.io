import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteCompany: async (_, { id }, ___) => {
      const company = await Company.findOne({ where: { id } });

      if (!company) {
        throw new Error("does not exist");
      }

      await Company.remove(company);

      return true;
    }
  }
};
