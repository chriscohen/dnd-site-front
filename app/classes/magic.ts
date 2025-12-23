import type {MediaApiResponse} from "~/classes/media";

export interface MagicDomainApiResponse {
    __typename: "Magic Domain"
    id: string
    name: string
}

export interface MagicSchoolApiResponse {
    __typename: "Magic School"
    id: string
    name: string
    description?: string
    image: MediaApiResponse
    parent?: MagicSchoolApiResponse
}
