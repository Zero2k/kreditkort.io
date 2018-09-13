import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchCompany: async (
      _,
      {
        input: { name },
        limit = 10,
        offset = 0
      }: GQL.ISearchCompanyOnQueryArguments,
      __
    ) => {
      let companydQB = getConnection()
        .getRepository(Company)
        .createQueryBuilder("company");
      if (name) {
        companydQB = companydQB.where("company.name ilike :name", {
          name: `%${name}%`
        });
      }

      return companydQB
        .take(limit)
        .skip(offset)
        .getMany();
    }
  }
};
