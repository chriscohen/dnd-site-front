import type {CreatureTypeEdition} from "~/classes/creatures/creatureTypeEdition";
import {
    createCreatureMajorType,
    type CreatureMajorType,
    type CreatureMajorTypeApiResponse
} from "~/classes/creatures/creatureMajorType";

export interface CreatureTypeApiResponse {
    id?: string
    gameEdition?: string
    majorType?: CreatureMajorTypeApiResponse
    origin?: string
}

export type CreatureTypeState = {
    id?: string
    gameEdition?: string,
    majorType?: CreatureMajorType,
    origin?: string
}

export const createCreatureType = (data?: CreatureTypeApiResponse) => {
    const state: CreatureTypeState = {
        id: data?.id,
        gameEdition: data?.gameEdition,
        majorType: createCreatureMajorType(data?.majorType),
        origin: data?.origin
    }

    const toString = (): string | undefined => {
        return state?.majorType?.name;
    }

    return {
        ...state,

        toString
    }
};

export type CreatureType = ReturnType<typeof createCreatureType>;
