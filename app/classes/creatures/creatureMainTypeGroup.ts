import {
    createCreatureMainType,
    type CreatureMainType,
    type CreatureMainTypeApiResponse
} from "~/classes/creatures/creatureMainType";

export interface CreatureMainTypeGroupApiResponse {
    id?: string
    gameEdition?: string
    majorType?: CreatureMainTypeApiResponse
    origin?: string
}

export type CreatureMainTypeGroupState = {
    id?: string
    gameEdition?: string,
    majorType?: CreatureMainType,
    origin?: string
}

export const createCreatureMainTypeGroup = (data?: CreatureMainTypeGroupApiResponse) => {
    const state: CreatureMainTypeGroupState = {
        id: data?.id,
        gameEdition: data?.gameEdition,
        majorType: createCreatureMainType(data?.majorType),
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

export type CreatureMainTypeGroup = ReturnType<typeof createCreatureMainTypeGroup>;
