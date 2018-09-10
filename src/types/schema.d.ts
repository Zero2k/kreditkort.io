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
findCompany: Array<ICompany>;
searchCompany: Array<ICompany>;
searchCreditcard: Array<ICreditcard>;
me: IUser | null;
}

interface IFindCompanyOnQueryArguments {
input?: IFindCompanyInput | null;
offset?: number | null;
limit?: number | null;
}

interface ISearchCompanyOnQueryArguments {
input?: ISearchCompanyInput | null;
offset?: number | null;
limit?: number | null;
}

interface ISearchCreditcardOnQueryArguments {
input?: ISearchCreditcardInput | null;
offset?: number | null;
limit?: number | null;
}

interface IFindCompanyInput {
__typename: "FindCompanyInput";
id: string | null;
}

interface ICompany {
__typename: "Company";
id: string;
name: string | null;
creditcards: Array<ICreditcard>;
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
amount_min: number | null;
amount_max: number | null;
term_min: number | null;
term_max: number | null;
exchange_rate: number | null;
annual_fee: number | null;
age: number | null;
card_types: Array<string>;
require_income: boolean | null;
check_uc: boolean | null;
bad_redit: boolean | null;
resident: boolean | null;
company: ICompany;
}

interface ISearchCompanyInput {
__typename: "SearchCompanyInput";
name: string | null;
}

interface ISearchCreditcardInput {
__typename: "SearchCreditcardInput";
name: string | null;
amount: number | null;
card_types: string | null;
check_uc: boolean | null;
bad_credit: boolean | null;
}

interface IUser {
__typename: "User";
id: string;
email: string;
}

interface IMutation {
__typename: "Mutation";
createCompany: boolean;
createCreditcard: boolean;
login: ILoginResponse;
logout: boolean | null;
register: Array<IError>;
}

interface ICreateCompanyOnMutationArguments {
input: ICreateCompanyInput;
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

interface ICreateCompanyInput {
__typename: "CreateCompanyInput";
name: string;
}

interface ICreateCreditcardInput {
__typename: "CreateCreditcardInput";
companyId: string;
name: string;
logo: string | null;
information: string | null;
url: string | null;
interest: number | null;
interest_fee: number | null;
amount_min: number | null;
amount_max: number | null;
term_min: number | null;
term_max: number | null;
exchange_rate: number | null;
annual_fee: number | null;
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
