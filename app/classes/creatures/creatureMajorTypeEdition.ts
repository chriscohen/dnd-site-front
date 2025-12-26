export interface CreatureMajorTypeEditionApiResponse {
    id?: string
    description?: string
    gameEdition?: string
}

export type CreatureMajorTypeEditionState = {
    id?: string
    description?: string
    gameEdition?: string
}

export const createCreatureMajorTypeEdition = (data?: CreatureMajorTypeEditionApiResponse) => {
    const state: CreatureMajorTypeEditionState = {
        id: data?.id,
        description: data?.description,
        gameEdition: data?.gameEdition,
    }

    return {
        ...state
    }
}

export type CreatureMajorTypeEdition = ReturnType<typeof createCreatureMajorTypeEdition>;
