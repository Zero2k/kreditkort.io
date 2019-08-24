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
    /* Creditcard */
    createCreditcard: isAuthenticated,
    deleteCreditcard: isAuthenticated,
    editCreditcard: isAuthenticated,
    /* Loan */
    createLoan: isAuthenticated,
    deleteLoan: isAuthenticated,
    editLoan: isAuthenticated,
    /* Comapny */
    createCompany: isAuthenticated,
    deleteCompany: isAuthenticated,
    editCompany: isAuthenticated,
    /* Media */
    addMedia: isAuthenticated,
    removeMedia: isAuthenticated,
    /* Post */
    createPost: isAuthenticated,
    deletePost: isAuthenticated,
    editPost: isAuthenticated,
    /* User */
    deleteUser: isAuthenticated
  },
  Query: {
    /* User */
    searchUser: isAuthenticated,
    /* Media */
    getFiles: isAuthenticated
  }
};
