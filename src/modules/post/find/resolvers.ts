import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Query: {
    findPost: async (
      _,
      { input: { id } }: GQL.IFindPostOnQueryArguments,
      ___
    ) => {
      return Post.findOne({
        where: { id }
      });
    },

    findPostBySlug: async (
      _,
      { input: { slug } }: GQL.IFindPostBySlugOnQueryArguments,
      ___
    ) => {
      return Post.findOne({
        where: { slug }
      });
    }
  }
};
