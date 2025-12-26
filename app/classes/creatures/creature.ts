import {
    createCreatureEdition, type CreatureEdition,
    type CreatureEditionApiResponse
} from "~/classes/creatures/creatureEdition";

export interface CreatureApiResponse {
    id?: string,
    name?: string,
    slug?: string,
    children?: CreatureApiResponse[],
    editions?: CreatureEditionApiResponse[],
    parent?: CreatureApiResponse,
}

export type CreatureState = {
    id?: string
    name?: string
    slug?: string
    editions?: CreatureEdition[]
}

export const createCreature = (data?: CreatureApiResponse) => {
    const state: CreatureState = {
        id: data?.id,
        name: data?.name,
        slug: data?.slug,
        editions: data?.editions?.map(createCreatureEdition)
    }

    return {
        ...state
    }
}

export type Creature = ReturnType<typeof createCreature>;
