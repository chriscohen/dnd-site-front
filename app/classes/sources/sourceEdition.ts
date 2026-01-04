import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";

export interface SourceEditionApiResponse {
    id: string
    sourcebookId: string
    name: string
    binding?: string
    boxSetItems?: SourceApiResponse[]
    formats: string[]
    hasContents?: boolean
    hasCredits?: boolean
    isbn10?: string
    isbn13?: string
    pages?: number
    releaseDate?: string
    releaseDateMonthOnly?: boolean
}

export type SourceEditionState = {
    id?: string
    sourcebookId?: string
    name?: string
    binding?: string
    boxSetItems?: Source[]
    formats?: string[]
    hasContents?: boolean
    hasCredits?: boolean
    isbn10?: string
    isbn13?: string
    pages?: number
    releaseDate?: string
    releaseDateMonthOnly?: boolean
}

export const createSourceEdition = (data?: SourceEditionApiResponse) => {
    const state: SourceEditionState = {
        id: data?.id,
        sourcebookId: data?.sourcebookId,
        name: data?.name,
        binding: data?.binding,
        boxSetItems: data?.boxSetItems?.map(createSource),
        formats: data?.formats,
        hasContents: data?.hasContents,
        hasCredits: data?.hasCredits,
        isbn10: data?.isbn10,
        isbn13: data?.isbn13,
        pages: data?.pages,
        releaseDate: data?.releaseDate,
        releaseDateMonthOnly: data?.releaseDateMonthOnly
    };

    return {
        ...state
    }
}

export type SourceEdition = ReturnType<typeof createSourceEdition>;
