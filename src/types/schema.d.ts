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
findCompanyBySlug: ICompany;
searchCompany: Array<ICompany>;
findCreditcard: ICreditcard;
findCreditcardBySlug: ICreditcard;
findCreditcardByLowestInterest: Array<ICreditcard>;
findCreditcardByHighestCredit: Array<ICreditcard>;
findCreditcardWithoutFee: Array<ICreditcard>;
findCreditcardInterestFree: Array<ICreditcard>;
findCreditcardWithoutWithdrawalFee: Array<ICreditcard>;
findCreditcardWithoutExchangeFee: Array<ICreditcard>;
findCreditcardWithMostInsurances: Array<ICreditcard>;
searchCreditcard: Array<ICreditcard>;
getFiles: Array<IMedia | null> | null;
uploads: Array<IFile | null> | null;
findPost: IPost;
findPostBySlug: IPost;
searchPost: Array<IPost>;
me: IUser | null;
searchUser: Array<IUser>;
}

interface IFindCompanyOnQueryArguments {
input?: IFindCompanyInput | null;
}

interface IFindCompanyBySlugOnQueryArguments {
input?: IFindCompanyBySlugInput | null;
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

interface IFindCreditcardInterestFreeOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardWithoutWithdrawalFeeOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardWithoutExchangeFeeOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface IFindCreditcardWithMostInsurancesOnQueryArguments {
offset?: number | null;
limit?: number | null;
}

interface ISearchCreditcardOnQueryArguments {
input?: ISearchCreditcardInput | null;
offset?: number | null;
limit?: number | null;
}

interface IFindPostOnQueryArguments {
input?: IFindPostInput | null;
}

interface IFindPostBySlugOnQueryArguments {
input?: IFindPostBySlugInput | null;
}

interface ISearchPostOnQueryArguments {
input?: ISearchPostInput | null;
offset?: number | null;
limit?: number | null;
}

interface ISearchUserOnQueryArguments {
input?: ISearchUserInput | null;
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
slug: string | null;
logo: string | null;
website: string | null;
about: string | null;
markdown: string | null;
creditcards: Array<ICreditcard | null>;
}

interface ICreditcardsOnCompanyArguments {
offset?: number | null;
limit?: number | null;
}

interface ICreditcard {
__typename: "Creditcard";
id: string;
name: string;
slug: string | null;
logo: string | null;
label: string | null;
information: string | null;
markdown: string | null;
url: string | null;
interest: number | null;
interest_free: number | null;
amount_min: number | null;
amount_max: number | null;
exchange_rate: number | null;
annual_fee: number | null;
withdrawal_fee: number | null;
administration_fee: number | null;
administration_fee_text: string | null;
age: number | null;
features: Array<string> | null;
advantages: Array<string> | null;
disadvantages: Array<string> | null;
bonuses: Array<string> | null;
traveling: Array<string> | null;
insurances: Array<string> | null;
offer: string | null;
card_types: Array<string> | null;
require_income: boolean | null;
check_uc: boolean | null;
bad_credit: boolean | null;
resident: boolean | null;
company: ICompany;
}

interface IFindCompanyBySlugInput {
slug: string;
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
label?: string | null;
interest?: number | null;
card_types?: string | null;
check_uc?: boolean | null;
bad_credit?: boolean | null;
}

interface IMedia {
__typename: "Media";
directory: string | null;
filePath: string | null;
files: Array<IFiles | null> | null;
}

interface IFiles {
__typename: "Files";
filePath: string | null;
name: string | null;
}

interface IFile {
__typename: "File";
filename: string;
path: string;
}

interface IFindPostInput {
id: string;
}

interface IPost {
__typename: "Post";
id: string;
title: string;
slug: string | null;
description: string | null;
image: string | null;
text: string | null;
markdown: string | null;
categories: Array<string> | null;
createdAt: string;
}

interface IFindPostBySlugInput {
slug: string;
}

interface ISearchPostInput {
query?: string | null;
categories?: string | null;
}

interface IUser {
__typename: "User";
id: string;
email: string;
}

interface ISearchUserInput {
email?: string | null;
}

interface IMutation {
__typename: "Mutation";
createCompany: boolean;
deleteCompany: boolean;
editCompany: boolean;
contact: boolean;
createCreditcard: boolean;
deleteCreditcard: boolean;
editCreditcard: boolean;
addMedia: IFile;
removeMedia: boolean | null;
createPost: boolean;
deletePost: boolean;
editPost: boolean;
deleteUser: boolean;
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

interface IContactOnMutationArguments {
name: string;
email: string;
message: string;
}

interface ICreateCreditcardOnMutationArguments {
input: ICreateCreditcardInput;
}

interface IDeleteCreditcardOnMutationArguments {
id: string;
}

interface IEditCreditcardOnMutationArguments {
cardId: string;
input: IEditCreditcardInput;
}

interface IAddMediaOnMutationArguments {
file: any;
directory: string;
}

interface IRemoveMediaOnMutationArguments {
file: string;
directory: string;
}

interface ICreatePostOnMutationArguments {
input: IPostInput;
}

interface IDeletePostOnMutationArguments {
id: string;
}

interface IEditPostOnMutationArguments {
postId: string;
input: IEditPostInput;
}

interface IDeleteUserOnMutationArguments {
id: string;
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
slug?: string | null;
logo?: string | null;
website?: string | null;
about?: string | null;
}

interface ICreateCreditcardInput {
companyId: string;
name: string;
logo?: string | null;
label?: string | null;
information?: string | null;
url?: string | null;
interest?: number | null;
interest_free?: number | null;
amount_min?: number | null;
amount_max?: number | null;
exchange_rate?: number | null;
annual_fee?: number | null;
withdrawal_fee?: number | null;
administration_fee?: number | null;
administration_fee_text?: string | null;
age?: number | null;
features?: Array<string> | null;
offer?: string | null;
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
label?: string | null;
information?: string | null;
url?: string | null;
interest?: number | null;
interest_free?: number | null;
amount_min?: number | null;
amount_max?: number | null;
exchange_rate?: number | null;
annual_fee?: number | null;
withdrawal_fee?: number | null;
administration_fee?: number | null;
administration_fee_text?: string | null;
age?: number | null;
features?: Array<string> | null;
advantages?: Array<string> | null;
disadvantages?: Array<string> | null;
bonuses?: Array<string> | null;
traveling?: Array<string> | null;
insurances?: Array<string> | null;
offer?: string | null;
card_types?: Array<string> | null;
require_income?: boolean | null;
check_uc?: boolean | null;
bad_credit?: boolean | null;
resident?: boolean | null;
}

interface IPostInput {
title: string;
description?: string | null;
text?: string | null;
image?: string | null;
categories?: Array<string> | null;
}

interface IEditPostInput {
title: string;
slug?: string | null;
description?: string | null;
image?: string | null;
text?: string | null;
categories?: Array<string> | null;
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
