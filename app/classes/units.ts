export interface AreaApiResponse {
    string: string
    id: string
    height?: number
    length?: number
    per_level?: number
    quantity: number
    radius: number
    width?: number
    type: string
}

export interface RangeApiResponse {
    __typename: "Range"
    id: string,
    string: string
    is_self: boolean
    is_touch: boolean
    number?: number
    per_level?: string
    unit: string
}
