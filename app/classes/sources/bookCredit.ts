import type {Person, PersonApiResponse} from "~/classes/person";

export interface BookCreditApiResponse {
    id?: string
    person?: PersonApiResponse
    role?: string
}

export type BookCreditState = {
    id?: string
    person?: Person
    role?: string
}

export const createBookCredit = (data?: BookCreditApiResponse) => {
    const state: BookCreditState = {
        id: data?.id,
        person: data?.person,
        role: data?.role
    }

    return {
        ...state
    }
}

export type BookCredit = ReturnType<typeof createBookCredit>;
