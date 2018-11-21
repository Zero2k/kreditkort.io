import { ResolverMap, Context } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Mutation: {
    createPost: async (_, { input: { ...data } }, { session }) => {
      const { title } = data;

      const postAlreadyExists = await Post.findOne({
        where: { title },
        select: ["title"]
      });

      if (postAlreadyExists) {
        throw new Error("post already exists");
      }

      const post = await Post.create({
        ...data,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
