import type {CategoryApiResponse} from "~/utils/types";
import type {SourceApiResponse} from "~/classes/sources/source";

export interface ItemApiResponse {
    id: string
    slug: string
    name: string
    category: CategoryApiResponse
    editions: ItemEditionApiResponse[]
}

export interface ItemEditionApiResponse {
    id: string
    item_id: string
    game_edition: string
    description: string
    price: number
    quantity: number
    weight: number
    source: SourceApiResponse
}
