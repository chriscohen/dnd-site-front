import {
    createCreatureTypeEdition, type CreatureTypeEdition,
    type CreatureTypeEditionApiResponse
} from "~/classes/creatures/creatureTypeEdition";

export interface CreatureTypeApiResponse {
    id?: string,
    name?: string,
    slug?: string,
    children?: CreatureTypeApiResponse[],
    editions?: CreatureTypeEditionApiResponse[],
    parent?: CreatureTypeApiResponse,
}

export type CreatureTypeState = {
    id?: string
    name?: string
    slug?: string
    editions?: CreatureTypeEdition[]
}

export const createCreatureType = (data?: CreatureTypeApiResponse) => {
    const state: CreatureTypeState = {
        id: data?.id,
        name: data?.name,
        slug: data?.slug,
        editions: data?.editions?.map(createCreatureTypeEdition)
    }

    return {
        ...state
    }
}

export type CreatureType = ReturnType<typeof createCreatureType>;
