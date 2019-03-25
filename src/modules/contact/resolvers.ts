import { ResolverMap } from "../../types/graphql-utils";
import mailer from "../../utils/mailer";

export const resolvers: ResolverMap = {
  Mutation: {
    contact: async (_, args, ___) => {
      try {
        const { email, name, message } = args;

        await mailer({ email, name, message });

        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
