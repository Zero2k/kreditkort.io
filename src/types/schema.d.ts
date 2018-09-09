// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "Query";
    searchCreditcard: Array<ICreditcard>;
    me: IUser | null;
  }

  interface ISearchCreditcardOnQueryArguments {
    input?: ISearchCreditcardInput | null;
    offset?: number | null;
    limit?: number | null;
  }

  interface ISearchCreditcardInput {
    __typename: "SearchCreditcardInput";
    name: string | null;
    amount: number | null;
    card_types: string | null;
    check_uc: boolean | null;
    bad_credit: boolean | null;
  }

  interface ICreditcard {
    __typename: "Creditcard";
    id: string;
    name: string;
    logo: string | null;
    information: string | null;
    url: string | null;
    interest: number | null;
    interest_fee: number | null;
    amount: number | null;
    term_min: number | null;
    term_max: number | null;
    exchange_rate: number | null;
    age: number | null;
    card_types: Array<string>;
    require_income: boolean | null;
    check_uc: boolean | null;
    bad_redit: boolean | null;
    resident: boolean | null;
  }

  interface IUser {
    __typename: "User";
    id: string;
    email: string;
  }

  interface IMutation {
    __typename: "Mutation";
    createCreditcard: boolean;
    login: ILoginResponse;
    logout: boolean | null;
    register: Array<IError>;
  }

  interface ICreateCreditcardOnMutationArguments {
    input: ICreateCreditcardInput;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateCreditcardInput {
    __typename: "CreateCreditcardInput";
    name: string;
    logo: string | null;
    information: string | null;
    url: string | null;
    interest: number | null;
    interest_fee: number | null;
    amount: number | null;
    term_min: number | null;
    term_max: number | null;
    exchange_rate: number | null;
    age: number | null;
    card_types: Array<string>;
    require_income: boolean | null;
    check_uc: boolean | null;
    bad_redit: boolean | null;
    resident: boolean | null;
  }

  interface ILoginResponse {
    __typename: "LoginResponse";
    errors: Array<IError>;
    sessionId: string | null;
  }

  interface IError {
    __typename: "Error";
    path: string;
    message: string;
  }
}

// tslint:enable
