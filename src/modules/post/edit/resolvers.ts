import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Mutation: {
    editPost: async (
      _,
      { postId, input: { ...data } }: GQL.IEditPostOnMutationArguments,
      { session }
    ) => {
      const {
        raw: [newPost]
      } = await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set(data)
        .where("id = :id", { id: postId })
        .returning("*")
        .execute();

      return true;
    }
  }
};
