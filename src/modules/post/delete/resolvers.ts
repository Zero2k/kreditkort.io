import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Mutation: {
    deletePost: async (
      _,
      { id }: GQL.IDeletePostOnMutationArguments,
      ___
    ) => {
      const post = await Post.findOne({ where: { id } });

      if (!post) {
        throw new Error("does not exist");
      }

      await Post.remove(post);

      return true;
    }
  }
};
