import { ResolverMap } from "../../../types/graphql-utils";
var md = require("markdown-it")();

export const resolvers: ResolverMap = {
  Post: {
    createdAt: async ({ createdAt }, __, ___) => {
      return new Date(createdAt).toISOString();
    },
    markdown: async ({ text }, __, ___) => {
      if (text) {
        return md.render(text);
      }

      return null;
    }
  }
};
