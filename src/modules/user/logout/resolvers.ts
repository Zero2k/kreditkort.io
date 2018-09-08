import { ResolverMap } from "../../../types/graphql-utils";
import { deleteUserSessions } from "../../../utils/deleteUserSessions";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis, res }) => {
      const { userId } = session;
      if (userId) {
        deleteUserSessions(userId, redis);
        session.destroy(err => {
          if (err) {
            console.log(err);
          }
        });
        res.clearCookie("qid");
        return true;
      }

      return false;
    }
  }
};
