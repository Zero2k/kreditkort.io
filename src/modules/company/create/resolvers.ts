import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Mutation: {
    createCompany: async (
      _,
      { input: { ...data } }: GQL.ICreateCompanyOnMutationArguments,
      { session }
    ) => {
      await Company.create({
        ...data as any,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
