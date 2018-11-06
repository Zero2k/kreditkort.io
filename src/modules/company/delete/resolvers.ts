import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteCompany: async (_, { id }, { session }) => {
      const company = await Company.findOne({ where: { id } });

      if (!company) {
        throw new Error("does not exist");
      }

      await Company.remove(company);

      return true;
    }
  }
};
