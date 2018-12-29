import { ResolverMap } from "../../../types/graphql-utils";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Post: {
    createdAt: async ({ createdAt }, __, ___) => {
      return new Date(createdAt).toISOString();
    },
    markdown: async ({ text }, __, ___) => {
      if (text) {
        return parseMd(text);
      }

      return null;
    }
  }
};
