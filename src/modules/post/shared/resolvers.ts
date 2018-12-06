import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

import { parseMd } from "../../../utils/parseMd";

export const resolvers: ResolverMap = {
  Post: {
    createdAt: async ({ createdAt }, __, ___) => {
      return new Date(createdAt).toISOString();
    },
    markdown: async ({ text }, __, ___) => {
      return parseMd(text);
    }
  }
};
