export interface CreatureMajorTypeEditionApiResponse {
    id?: string
    alternateName?: string
    description?: string
    gameEdition?: string
}

export type CreatureMajorTypeEditionState = {
    id?: string
    alternateName?: string
    description?: string
    gameEdition?: string
}

export const createCreatureMajorTypeEdition = (data?: CreatureMajorTypeEditionApiResponse) => {
    const state: CreatureMajorTypeEditionState = {
        id: data?.id,
        alternateName: data?.alternateName,
        description: data?.description,
        gameEdition: data?.gameEdition,
    }

    return {
        ...state
    }
}

export type CreatureMajorTypeEdition = ReturnType<typeof createCreatureMajorTypeEdition>;
