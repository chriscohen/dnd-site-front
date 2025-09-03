export interface IAttackType {
    id: string
    name: string
}

export interface ICampaignSetting {
    __typename: "Campaign Setting"
    id: string
    slug: string
    name: string
    short_name: string
    publisher: ICompany
    publication_type: string
    logo?: IMedia
}

export interface ICategory {
    id: string
    slug: string
    name: string
    entity_type: string
    parent?: ICategory
    image?: IMedia
}

export interface ICompany {
    __typename: "Company"
    id: string
    slug: string
    name: string
    short_name?: string
    website?: string
}

export interface IItem {
    id: string
    slug: string
    name: string
    category: ICategory
    editions: IItemEdition[]
}

export interface IItemEdition {
    id: string
    item_id: string
    game_edition: string
    description: string
    price: number
    quantity: number
    weight: number
    source: ISourcebook
}

export interface IMagicSchool {
    id: string
    name: string
}

export interface IMedia {
    id: string
    url: string
    collection_name?: string
    name?: string
    filename: string
    size?: number
    mime_type?: string
}

export interface ISourcebook {
    __typename: "Sourcebook",
    id: string
    slug: string
    name: string
    description: string
    product_code: string
    source_type: string
    game_edition: string
    publication_type: string
    cover_image: IMedia
    campaign_setting?: ICampaignSetting
    editions: ISourcebookEdition[]
}

export interface ISourcebookEdition {
    id: string
    sourcebook_id: string
    name: string
    binding: string
    isbn10: string
    isbn13: string
    pages: number
    release_date: string
    release_date_month_only: boolean
}

