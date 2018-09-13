import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Mutation: {
    editCreditcard: async (
      _,
      { cardId, input: { ...data } }: GQL.IEditCreditcardOnMutationArguments,
      { session }
    ) => {
      /* Check if user is Authenticated */
      const {
        raw: [newCreditcard]
      } = await getConnection()
        .createQueryBuilder()
        .update(Creditcard)
        .set(data)
        .where("id = :id", { id: cardId })
        .returning("*")
        .execute();

      return true;
    }
  }
};
