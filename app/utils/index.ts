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

export interface ICharacterClass {
    id: string
    name: string
}

export interface ICompany {
    __typename: "Company"
    id: string
    slug: string
    name: string
    logo?: IMedia
    product_url: string
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

export interface IMagicDomain {
    __typename: "Magic Domain"
    id: string
    name: string
}

export interface IMagicSchool {
    __typename: "Magic School"
    id: string
    name: string
    image: IMedia
}

export interface IMedia {
    __typename: "Media"
    id: string
    url: string
    collection_name?: string
    name?: string
    filename: string
    size?: number
    mime_type?: string
}

export interface IProductId {
    __typename: "Product ID"
    id: string
    origin: ICompany
    product_id: string
    source: ISourcebook
    url?: string
}

export interface ISourcebook {
    __typename: "Sourcebook",
    id: string
    slug: string
    name: string
    campaign_setting?: ICampaignSetting
    cover_image: IMedia
    description: string
    editions: ISourcebookEdition[]
    game_edition: string
    product_code: string
    product_ids: IProductId[]
    publication_type: string
    source_type: string
}

export interface ISourcebookEdition {
    id: string
    sourcebook_id: string
    name: string
    binding: string
    formats: string[]
    isbn10: string
    isbn13: string
    pages: number
    release_date: string
    release_date_month_only: boolean
}

export interface ISpell {
    id: string
    slug: string
    name: string
    editions: ISpellEdition[]
}

export interface ISpellEdition {
    id: string
    class_levels: ISpellEditionCharacterClassLevel[]
    components: string
    description: string
    domains: string[]
    game_edition: string
    higher_level: string
    is_default: boolean
    lowest_level: number
    range: string
    school: string
}

export interface ISpellEditionCharacterClassLevel {
    id: string
    spell_edition: ISpellEdition,
    character_class: string
    character_class_raw: ICharacterClass
    level: number
}
