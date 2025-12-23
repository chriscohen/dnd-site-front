import type {MediaApiResponse} from "~/classes/media";
import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";

export interface CompanyApiResponse {
    __typename: "Company"
    id: string
    slug: string
    name: string
    logo?: MediaApiResponse,
    products: SourceApiResponse[],
    productUrl: string
    shortName?: string
    website?: string
}

export type CompanyState = {
    id?: string,
    slug?: string,
    name?: string,
    logo?: MediaApiResponse,
    products?: any[],
    productUrl?: string,
    shortName?: string,
    website?: string
}

export const createCompany = (data?: CompanyApiResponse) => {
    const state: CompanyState = {
        id: data?.id,
        slug: data?.slug,
        name: data?.name,
        logo: data?.logo,
        products: data?.products.map(createSource),
        productUrl: data?.productUrl,
        shortName: data?.shortName,
        website: data?.website
    }

    return {
        ...state
    }
}

export type Company = ReturnType<typeof createCompany>;
