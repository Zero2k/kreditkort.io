import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Mutation: {
    editCompany: async (
      _,
      { companyId, input: { ...data } }: GQL.IEditCompanyOnMutationArguments,
      ___
    ) => {
      /* Check if user is Authenticated */
      await getConnection()
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
