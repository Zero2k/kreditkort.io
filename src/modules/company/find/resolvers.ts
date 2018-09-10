import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    findCompany: async (_, { input: { id } }, ___) => {
      return Company.find({ where: { id } });
    }
  }
};
