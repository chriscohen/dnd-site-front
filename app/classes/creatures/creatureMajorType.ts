import {
    createCreatureMajorTypeEdition,
    type CreatureMajorTypeEdition,
    type CreatureMajorTypeEditionApiResponse
} from "~/classes/creatures/creatureMajorTypeEdition";

export interface CreatureMajorTypeApiResponse {
    id?: string
    editions?: CreatureMajorTypeEditionApiResponse[]
    name?: string
    plural?: string
    slug?: string
}

export type CreatureMajorTypeState = {
    id?: string
    editions?: CreatureMajorTypeEdition[]
    name?: string
    plural?: string
    slug?: string
}

export const createCreatureMajorType = (data?: CreatureMajorTypeApiResponse) => {
    const state: CreatureMajorTypeState = {
        id: data?.id,
        editions: data?.editions?.map(createCreatureMajorTypeEdition),
        name: data?.name,
        plural: data?.plural,
        slug: data?.slug
    }

    const description = (): string | undefined => state?.editions?.[0]?.description

    return {
        ...state,

        description
    }
}

export type CreatureMajorType = ReturnType<typeof createCreatureMajorType>;
