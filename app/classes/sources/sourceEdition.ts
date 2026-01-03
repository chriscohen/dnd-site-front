import {createSource, type Source, type SourceApiResponse} from "~/classes/sources/source";
import {
    createSourceContents,
    type SourceContents,
    type SourceContentsApiResponse
} from "~/classes/sources/sourceContents";
import type {BookCredit, BookCreditApiResponse} from "~/classes/sources/bookCredit";
import type {Person} from "~/classes/person";

export interface SourceEditionApiResponse {
    id: string
    sourcebookId: string
    name: string
    binding?: string
    boxSetItems?: SourceApiResponse[]
    contents?: SourceContentsApiResponse[],
    credits?: BookCreditApiResponse[]
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
    credits?: BookCredit[],
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

    const creditsByRole = () => {
        const roles: Record<string, Person[]> = {};

        // Build an object keyed by each role.
        state.credits?.forEach((credit: BookCredit) => {
            if (credit.role) roles[credit.role] = [];
        });

        // Add people from the list of credits to each role key in the roles object.
        Object.keys(roles).forEach((role: string) => {
            roles[role] = state.credits?.filter(
                (credit: BookCredit) => credit?.role === role && credit.person
            )?.map(
                (credit: BookCredit) => credit.person ?? {}
            ) ?? [];
        });

        return roles;
    }

    return {
        ...state,

        creditsByRole
    }
}

export type SourceEdition = ReturnType<typeof createSourceEdition>;
