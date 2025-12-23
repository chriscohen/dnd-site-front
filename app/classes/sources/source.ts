import {createMedia, type Media, type MediaApiResponse} from "~/classes/media";
import {type Company, type CompanyApiResponse, createCompany} from "~/classes/company";
import type {ProductIdApiResponse} from "~/classes/product";
import {type CampaignSetting, type CampaignSettingApiResponse, createCampaignSetting} from "~/classes/campaignSetting";
import type {SourceEditionApiResponse} from "~/classes/sources/sourceEdition";

export interface SourceApiResponse {
    __typename: "Sourcebook",
    id: string,
    name: string
    shortName: string
    slug: string
    campaignSetting?: CampaignSettingApiResponse
    coverImage: MediaApiResponse
    description: string
    editions: SourceEditionApiResponse[]
    gameEdition: string
    parent?: SourceApiResponse
    productCode: string
    productIds: ProductIdApiResponse[]
    publicationType: string
    publisher?: CompanyApiResponse
    sourceType: string
    sourcebookTypes?: string[]
}

export type SourceState = {
    id?: string,
    name?: string,
    shortName?: string,
    slug?: string,
    campaignSetting?: CampaignSetting,
    coverImage?: Media,
    description?: string,
    editions?: SourceEditionApiResponse[],
    gameEdition?: string,
    parent?: any,
    productCode?: string,
    productIds?: ProductIdApiResponse[],
    publicationType?: string,
    publisher?: Company,
    sourceType?: string,
    sourcebookTypes?: string[]
}

export const createSource = (data?: SourceApiResponse) => {
    const state: SourceState = {
        id: data?.id,
        name: data?.name,
        shortName: data?.shortName,
        slug: data?.slug,
        campaignSetting: createCampaignSetting(data?.campaignSetting),
        coverImage: createMedia(data?.coverImage),
        description: data?.description,
        editions: data?.editions,
        gameEdition: data?.gameEdition,
        parent: data?.parent,
        productCode: data?.productCode,
        productIds: data?.productIds,
        publicationType: data?.publicationType,
        publisher: createCompany(data?.publisher),
        sourceType: data?.sourceType,
        sourcebookTypes: data?.sourcebookTypes
    };

    return {
        ...state
    }
}

export type Source = ReturnType<typeof createSource>;
