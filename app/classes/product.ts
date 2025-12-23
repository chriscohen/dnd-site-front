import type {SourceApiResponse} from "~/classes/sources/source";
import type {CompanyApiResponse} from "~/classes/company";

export interface ProductIdApiResponse {
    __typename: "Product ID"
    id: string
    origin: CompanyApiResponse
    product_id: string
    source: SourceApiResponse
    url?: string
}
