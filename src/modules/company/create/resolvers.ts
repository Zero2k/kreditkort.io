import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Mutation: {
    createCompany: async (_, { input: { ...data } }, { session }) => {
      const company = await Company.create({
        ...data,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
