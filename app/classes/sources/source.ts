import {createMedia, type Media, type MediaApiResponse} from "~/classes/media";
import {type Company, type CompanyApiResponse, createCompany} from "~/classes/company";
import {createProductId, type ProductIdApiResponse, type ProductIdState} from "~/classes/productId";
import {type CampaignSetting, type CampaignSettingApiResponse, createCampaignSetting} from "~/classes/campaignSetting";
import {
    createSourceEdition,
    type SourceEditionApiResponse,
    type SourceEditionState
} from "~/classes/sources/sourceEdition";

export interface SourceApiResponse {
    id?: string
    campaignSetting?: CampaignSettingApiResponse
    coverImage?: MediaApiResponse
    description?: string
    editions?: SourceEditionApiResponse[]
    gameEdition?: string
    name?: string
    parent?: SourceApiResponse
    productCode?: string
    productIds?: ProductIdApiResponse[]
    publicationType?: string
    publisher?: CompanyApiResponse
    shortName?: string
    slug?: string
    sourceType?: string
    sourcebookTypes?: string[]
}

export type SourceState = {
    id?: string
    campaignSetting?: CampaignSetting
    coverImage?: Media
    description?: string
    editions?: SourceEditionState[]
    gameEdition?: string
    name?: string
    parent?: SourceState
    productCode?: string
    productIds?: ProductIdState[]
    publicationType?: string
    publisher?: Company
    shortName?: string
    slug?: string
    sourceType?: string
    sourcebookTypes?: string[]
}

export const createSource = (data?: SourceApiResponse) => {
    const state: SourceState = {
        id: data?.id,
        name: data?.name,
        shortName: data?.shortName,
        slug: data?.slug,
        campaignSetting: createCampaignSetting(data?.campaignSetting),
        coverImage: data?.coverImage ? createMedia(data?.coverImage) : undefined,
        description: data?.description,
        editions: data?.editions?.map(createSourceEdition),
        gameEdition: data?.gameEdition,
        parent: data?.parent ? createSource(data.parent) : undefined,
        productCode: data?.productCode,
        productIds: data?.productIds?.map(createProductId),
        publicationType: data?.publicationType,
        publisher: createCompany(data?.publisher),
        sourceType: data?.sourceType,
        sourcebookTypes: data?.sourcebookTypes
    };

    const hasEditions = () => (state.editions?.length ?? 0);

    return {
        ...state,

        hasEditions
    }
}

export type Source = ReturnType<typeof createSource>;
