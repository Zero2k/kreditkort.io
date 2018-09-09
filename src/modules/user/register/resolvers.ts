import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments, __) => {
      /* try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      } */

      const { email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: "Duplicate Email"
          }
        ];
      }

      const user = User.create({
        email,
        password
      });

      await user.save();

      return null;
    }
  }
};
