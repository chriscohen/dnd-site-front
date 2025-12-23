import {createReference, type Reference, type ReferenceApiResponse} from "~/classes/reference";
import type {CreatureTypeApiResponse} from "~/classes/creatures/creatureType";

export interface CreatureTypeEditionApiResponse {
    id: string
    creatureType: CreatureTypeApiResponse
    gameEdition: string
    references?: ReferenceApiResponse[]
}

export type CreatureTypeEditionState = {
    id?: string
    //creatureType?:
    gameEdition?: string
    references?: Reference[]
};

export const createCreatureTypeEdition = (data?: CreatureTypeEditionApiResponse) => {
    const state = {
        id: data?.id,
        gameEdition: data?.gameEdition,
        references: data?.references?.map(createReference)
    }

    return {
        ...state
    }
};

export type CreatureTypeEdition = ReturnType<typeof createCreatureTypeEdition>;
