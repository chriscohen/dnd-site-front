export interface CreatureHitPointsApiResponse {
    id: string
    average?: number
    formula?: string
}

export type CreatureHitPointsState = {
    id?: string
    average?: number
    formula?: string
};

export const createCreatureHitPoints = (data?: CreatureHitPointsApiResponse) => {
    const state: CreatureHitPointsState = {
        id: data?.id,
        average: data?.average,
        formula: data?.formula
    }

    return {
        ...state
    }
};

export type CreatureHitPoints = ReturnType<typeof createCreatureHitPoints>;
