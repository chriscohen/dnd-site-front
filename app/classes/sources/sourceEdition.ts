import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";
import type {Person, PersonApiResponse} from "~/classes/person";
import {
    createSourceContents,
    type SourceContents,
    type SourceContentsApiResponse
} from "~/classes/sources/sourceContents";

export interface SourceEditionApiResponse {
    id: string
    sourcebookId: string
    name: string
    binding?: string
    boxSetItems?: SourceApiResponse[]
    contents?: SourceContentsApiResponse[],
    credits?: Record<string, PersonApiResponse[]>
    formats: string[]
    isbn10?: string
    isbn13?: string
    pages?: number
    releaseDate?: string
    releaseDateMonthOnly?: boolean
}

export type SourceEditionState = {
    id?: string,
    sourcebookId?: string,
    name?: string,
    binding?: string,
    boxSetItems?: Source[],
    contents?: SourceContents[],
    credits?: Record<string, Person[]>,
    formats?: string[],
    isbn10?: string,
    isbn13?: string,
    pages?: number,
    releaseDate?: string,
    releaseDateMonthOnly?: boolean
}

export const createSourceEdition = (data?: SourceEditionApiResponse) => {
    const state: SourceEditionState = {
        id: data?.id,
        sourcebookId: data?.sourcebookId,
        name: data?.name,
        binding: data?.binding,
        boxSetItems: data?.boxSetItems?.map(createSource),
        contents: data?.contents?.map(createSourceContents),
        credits: data?.credits,
        formats: data?.formats,
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
