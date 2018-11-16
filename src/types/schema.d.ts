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
findCompany: ICompany;
searchCompany: Array<ICompany>;
findCreditcard: ICreditcard;
findCreditcardBySlug: ICreditcard;
findCreditcardByLowestInterest: Array<ICreditcard>;
findCreditcardByHighestCredit: Array<ICreditcard>;
findCreditcardWithoutFee: Array<ICreditcard>;
searchCreditcard: Array<ICreditcard>;
me: IUser | null;
}

interface IFindCompanyOnQueryArguments {
input?: IFindCompanyInput | null;
}

interface ISearchCompanyOnQueryArguments {
input?: ISearchCompanyInput | null;
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardOnQueryArguments {
input?: IFindCreditcardInput | null;
}

interface IFindCreditcardBySlugOnQueryArguments {
input?: IFindCreditcardBySlugInput | null;
}

interface IFindCreditcardByLowestInterestOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardByHighestCreditOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardWithoutFeeOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface ISearchCreditcardOnQueryArguments {
input?: ISearchCreditcardInput | null;
offset?: number | null;
limit?: number | null;
}

interface IFindCompanyInput {
id: string;
}

interface ICompany {
__typename: "Company";
id: string;
name: string | null;
logo: string | null;
website: string | null;
about: string | null;
creditcards: Array<ICreditcard | null>;
}

interface ICreditcard {
__typename: "Creditcard";
id: string;
name: string;
slug: string | null;
logo: string | null;
information: string | null;
url: string | null;
interest: number | null;
interest_free: number | null;
amount_min: number | null;
amount_max: number | null;
exchange_rate: number | null;
annual_fee: number | null;
withdrawal_fee: number | null;
age: number | null;
features: Array<string> | null;
advantages: Array<string> | null;
disadvantages: Array<string> | null;
bonuses: Array<string> | null;
traveling: Array<string> | null;
insurances: Array<string> | null;
card_types: Array<string> | null;
require_income: boolean | null;
check_uc: boolean | null;
bad_credit: boolean | null;
resident: boolean | null;
company: ICompany;
}

interface ISearchCompanyInput {
name?: string | null;
}

interface IFindCreditcardInput {
id: string;
}

interface IFindCreditcardBySlugInput {
slug: string;
}

interface ISearchCreditcardInput {
name?: string | null;
amount?: number | null;
card_types?: string | null;
check_uc?: boolean | null;
bad_credit?: boolean | null;
}

interface IUser {
__typename: "User";
id: string;
email: string;
}

interface IMutation {
__typename: "Mutation";
createCompany: boolean;
deleteCompany: boolean;
editCompany: boolean;
createCreditcard: boolean;
editCreditcard: boolean;
login: ILoginResponse;
logout: boolean | null;
register: Array<IError> | null;
}

interface ICreateCompanyOnMutationArguments {
input: ICreateCompanyInput;
}

interface IDeleteCompanyOnMutationArguments {
id: string;
}

interface IEditCompanyOnMutationArguments {
companyId: string;
input: IEditCompanyInput;
}

interface ICreateCreditcardOnMutationArguments {
input: ICreateCreditcardInput;
}

interface IEditCreditcardOnMutationArguments {
cardId: string;
input: IEditCreditcardInput;
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
name: string;
logo?: string | null;
website?: string | null;
about?: string | null;
}

interface IEditCompanyInput {
name: string;
logo?: string | null;
website?: string | null;
about?: string | null;
}

interface ICreateCreditcardInput {
companyId: string;
name: string;
logo?: string | null;
information?: string | null;
url?: string | null;
interest?: number | null;
interest_free?: number | null;
amount_min?: number | null;
amount_max?: number | null;
exchange_rate?: number | null;
annual_fee?: number | null;
withdrawal_fee?: number | null;
age?: number | null;
features?: Array<string> | null;
advantages?: Array<string> | null;
disadvantages?: Array<string> | null;
bonuses?: Array<string> | null;
traveling?: Array<string> | null;
insurances?: Array<string> | null;
card_types?: Array<string> | null;
require_income?: boolean | null;
check_uc?: boolean | null;
bad_credit?: boolean | null;
resident?: boolean | null;
}

interface IEditCreditcardInput {
name: string;
slug?: string | null;
logo?: string | null;
information?: string | null;
url?: string | null;
interest?: number | null;
interest_free?: number | null;
amount_min?: number | null;
amount_max?: number | null;
exchange_rate?: number | null;
annual_fee?: number | null;
withdrawal_fee?: number | null;
age?: number | null;
features?: Array<string> | null;
advantages?: Array<string> | null;
disadvantages?: Array<string> | null;
bonuses?: Array<string> | null;
traveling?: Array<string> | null;
insurances?: Array<string> | null;
card_types?: Array<string> | null;
require_income?: boolean | null;
check_uc?: boolean | null;
bad_credit?: boolean | null;
resident?: boolean | null;
}

interface ILoginResponse {
__typename: "LoginResponse";
errors: Array<IError> | null;
sessionId: string | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}
}

// tslint:enable
