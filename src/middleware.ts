const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    throw new Error("You need to be authenticated!");
  }

  return resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createCreditcard: isAuthenticated,
    createCompany: isAuthenticated
  }
};
