import type {CreatureTypeEdition} from "~/classes/creatures/creatureTypeEdition";

export interface CreatureTypeApiResponse {
    id: string
    name: string
    slug: string
    editions?: CreatureTypeEdition[]
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
        editions: data?.editions
    }

    return {
        ...state
    }
};

export type CreatureType = ReturnType<typeof createCreatureType>;
