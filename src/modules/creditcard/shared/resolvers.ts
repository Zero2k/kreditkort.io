import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Creditcard: {
    company: async ({ companyId }, __, ___) => {
      return Company.findOne({ where: { id: companyId } });
    }
  }
};
