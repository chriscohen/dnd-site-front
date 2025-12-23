export interface PersonApiResponse {
    id: string
    firstName: string
    initials?: string[]
    instagram?: string
    lastName: string
    slug: string
    twitter?: string
    youtube?: string
}

export type PersonState = {
    id?: string,
    firstName?: string,
    initials?: string[],
    instagram?: string,
    lastName?: string,
    slug?: string,
    twitter?: string
    youtube?: string
}

export const createPerson = (data?: PersonApiResponse) => {
    const state: PersonState = {
        id: data?.id,
        firstName: data?.firstName,
        initials: data?.initials,
        instagram: data?.instagram,
        lastName: data?.lastName,
        slug: data?.slug,
        twitter: data?.twitter,
        youtube: data?.youtube
    }

    return {
        ...state
    }
}

export type Person = ReturnType<typeof createPerson>;
