import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchPost: async (
      _,
      {
        input: { query, categories },
        limit = 10,
        offset = 0
      },
      __
    ) => {
      let postQB = getConnection()
        .getRepository(Post)
        .createQueryBuilder("post");
      if (query) {
        postQB = postQB.andWhere(
          "post.title ilike :query OR post.text ilike :query",
          {
            query: query
              .split(" ")
              .map((value: any) => `%${value}%`)
              .join("")
          }
        );
      }
      if (categories) {
        postQB = postQB.andWhere(":categories = ANY(post.categories)", {
          categories
        });
      }

      return postQB
        .take(limit)
        .skip(offset)
        .orderBy("post.createdAt", "DESC")
        .getMany();
    }
  }
};
