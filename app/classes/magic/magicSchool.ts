import {createMedia, type Media, type MediaApiResponse} from "~/classes/media";

export interface MagicSchoolApiResponse {
    id?: string
    name?: string
    description?: string
    image?: MediaApiResponse
    parent?: MagicSchoolApiResponse
}

export type MagicSchoolState = {
    id?: string,
    name?: string,
    description?: string,
    image?: Media
    parent?: MagicSchoolState
}

export const createMagicSchool = (data?: MagicSchoolApiResponse) => {
    const state: MagicSchoolState = {
        id: data?.id,
        name: data?.name,
        description: data?.description,
        image: createMedia(data?.image),
        parent: createMagicSchool(data?.parent)
    }

    return {
        ...state
    }
}

export type MagicSchool = ReturnType<typeof createMagicSchool>;
