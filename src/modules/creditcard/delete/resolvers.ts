import { ResolverMap } from "../../../types/graphql-utils";
import { Creditcard } from "../../../entity/Creditcard";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteCreditcard: async (
      _,
      { id }: GQL.IDeleteCreditcardOnMutationArguments,
      ___
    ) => {
      const creditcard = await Creditcard.findOne({ where: { id } });

      if (!creditcard) {
        throw new Error("does not exist");
      }

      await Creditcard.remove(creditcard);

      return true;
    }
  }
};
