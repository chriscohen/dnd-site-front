import type {MediaApiResponse} from "~/classes/media";

export interface CategoryApiResponse {
    id: string
    slug: string
    name: string
    entity_type: string
    parent?: CategoryApiResponse
    image?: MediaApiResponse
}
