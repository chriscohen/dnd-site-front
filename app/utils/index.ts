export interface IArea {
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

export interface IAttackType {
    id: string
    name: string
}

export interface IBoxedSetItem {
    id: string
    slug: string
    name: string
    content_type: string
    pages: number
    parent: ISourcebookEdition
    quantity: number
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
    description?: string
    image: IMedia
    parent?: IMagicSchool
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

export interface IMediaTeaser {
    id: string
    url: string
}

export interface IProductId {
    __typename: "Product ID"
    id: string
    origin: ICompany
    product_id: string
    source: ISourcebook
    url?: string
}

export interface IQueryString {
    editions?: string
    mode?: string
}

export interface IRange {
    __typename: "Range"
    id: string,
    string: string
    is_self: boolean
    is_touch: boolean
    number?: number
    per_level?: string
    unit: string
}

export interface IReferenceTeaser {
    id: string
    page_from: number
    page_to?: number
    source: string
    slug: string
    image: IMedia

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
    sourcebook_types?: string[]
}

export interface ISourcebookEdition {
    id: string
    sourcebook_id: string
    name: string
    binding: string
    box_set_items: IBoxedSetItem[]
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
    image: IMedia
    editions: ISpellEdition[]
}

export interface ISpellTeaser {
    id: string
    slug: string
    name: string
    editions: ISpellEditionTeaser[]
    image: IMediaTeaser
    lowest_level: number
    school: string
}

export interface ISpellEdition {
    id: string
    area?: IArea
    class_levels: ISpellEditionCharacterClassLevel[]
    description: string
    domains: string[]
    game_edition: string
    has_saving_throw?: boolean
    has_spell_resistance?: boolean
    higher_level: string
    is_default: boolean
    lowest_level: number
    range: string
    references: IReferenceTeaser[]
    saving_throw_multipler?: number
    saving_throw_type?: string
    school: IMagicSchool
    spell_components: string
}

export interface ISpellEditionTeaser {
    id: string
    spell_id: string
    game_edition: string
}

export interface ISpellEditionCharacterClassLevel {
    id: string
    spell_edition: ISpellEdition,
    character_class: string
    character_class_raw: ICharacterClass
    level: number
}

export enum RenderMode {
    SHORT = 'short',
    TEASER = 'teaser',
    FULL = 'full',
}
