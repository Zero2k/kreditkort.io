import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Mutation: {
    editCompany: async (
      _,
      { companyId, input: { ...data } }: GQL.IEditCompanyOnMutationArguments,
      { session }
    ) => {
      /* Check if user is Authenticated */
      const {
        raw: [newCompany]
      } = await getConnection()
        .createQueryBuilder()
        .update(Company)
        .set(data)
        .where("id = :id", { id: companyId })
        .returning("*")
        .execute();

      return true;
    }
  }
};
