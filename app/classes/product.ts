import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";
import {type Company, type CompanyApiResponse, createCompany} from "~/classes/company";

export interface ProductIdApiResponse {
    id?: string
    origin?: CompanyApiResponse
    productId?: string
    source?: SourceApiResponse
    url?: string
}

export type ProductIdState = {
    id?: string
    origin?: Company
    productId?: string
    source?: Source
    url?: string
}

export const createProductId = (data?: ProductIdApiResponse) => {
    const state: ProductIdState = {
        id: data?.id,
        origin: createCompany(data?.origin),
        productId: data?.productId,
        source: createSource(data?.source),
        url: data?.url
    }

    return {
        ...state
    }
}

export type ProductId = ReturnType<typeof createProductId>;
