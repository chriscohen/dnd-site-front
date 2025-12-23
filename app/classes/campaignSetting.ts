import type {MediaApiResponse} from "~/classes/media";
import {type Company, type CompanyApiResponse, createCompany} from "~/classes/company";

export interface CampaignSettingApiResponse {
    __typename: "Campaign Setting"
    id: string
    description?: string
    logo?: MediaApiResponse
    name: string
    publisher: CompanyApiResponse
    publication_type: string
    slug: string
    shortName: string
    startYear?: number
}

export type CampaignSettingState = {
    id?: string,
    description?: string,
    logo?: MediaApiResponse,
    name?: string,
    publisher?: Company,
    publication_type?: string,
    slug?: string,
    shortName?: string,
    startYear?: number
}

export const createCampaignSetting = (data?: CampaignSettingApiResponse) => {
    const state: CampaignSettingState = {
        id: data?.id,
        description: data?.description,
        logo: data?.logo,
        name: data?.name,
        publisher: createCompany(data?.publisher),
        publication_type: data?.publication_type,
        slug: data?.slug,
        shortName: data?.shortName,
        startYear: data?.startYear
    }

    return {
        ...state
    }
}

export type CampaignSetting = ReturnType<typeof createCampaignSetting>;
