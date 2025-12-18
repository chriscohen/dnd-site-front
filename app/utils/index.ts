export interface IAbilityScoreModifierGroup {
    str?: number,
    dex?: number,
    con?: number,
    int?: number,
    wis?: number,
    cha?: number,
    choose?: {
        from: string[],
        amount?: number
        count?: number
    }
}

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
    description?: string
    logo?: IMedia
    name: string
    publisher: ICompany
    publication_type: string
    slug: string
    shortName: string
    startYear?: number
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
    slug: string
    name: string
    editions: ICharacterClassEdition[]
    image?: IMediaTeaser
    is_prestige: boolean
}

export interface ICharacterClassEdition {
    id: string
    game_edition: string
    is_prestige: boolean
    references: IReference[]
}

export interface ICompany {
    __typename: "Company"
    id: string
    slug: string
    name: string
    logo?: IMedia,
    products: ISourcebook[],
    productUrl: string
    shortName?: string
    website?: string
}

export interface IFeat {
    __typename: "Feat"
    id: string
    slug: string
    name: string
    editions: IFeatEdition[]
}

export interface IFeatEdition {
    __typename: "FeatEdition"
    id: string
    slug: string
    name: string
    description: string
    game_edition: string
    prerequisites: IPrerequisite[]
    references: IReference[]
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

export interface ILanguage {
    id: string
    slug: string
    name: string
    isExotic?: boolean
    references?: IReference[]
    scriptName?: string
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

export interface IMovementSpeedGroup {
    burrow?: number,
    canHover?: boolean,
    climb?: number,
    fly?: number,
    swim?: number,
    walk?: number
}

export interface IPerson {
    id: string
    firstName: string
    initials?: string[]
    lastName: string
    slug: string
    twitter?: string
}

export interface IPrerequisite {
    __typename: "Prerequisite"
    id: string
    type: string
    values: IPrerequisiteValue[]
}

export interface IPrerequisiteValue {
    __typename: "PrerequisiteValue"
    id: string
    value: string
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

export interface IReference {
    id: string
    pageFrom: number
    pageTo?: number
    shortName?: string
    source: string
    slug: string
    image: IMedia

}

export interface ISavingThrow {
    id: string
    type: string
    fail_status?: string
    multiplier?: string
}

export interface ISourcebook {
    __typename: "Sourcebook",
    id: string
    slug: string
    name: string
    campaignSetting?: ICampaignSetting
    coverImage: IMedia
    description: string
    editions: ISourcebookEdition[]
    gameEdition: string
    parent?: ISourcebook
    productCode: string
    productIds: IProductId[]
    publicationType: string
    publisher?: ICompany
    sourceType: string
    sourcebookTypes?: string[]
}

export interface ISourcebookContents {
    id: string,
    edition_id?: string
    name: string,
    ordinal: string,
    source?: string,
    type: string,
    headers: { header: string }[]
}

export interface ISourcebookEdition {
    id: string
    sourcebookId: string
    name: string
    binding?: string
    boxSetItems?: IBoxedSetItem[]
    contents?: ISourcebookContents[],
    credits?: Record<string, IPerson[]>
    formats: string[]
    isbn10?: string
    isbn13?: string
    pages?: number
    releaseDate?: string
    releaseDateMonthOnly?: boolean
}

export interface ISpecies {
    id: string,
    slug: string,
    name: string,
    editions: ISpeciesEdition[]
}

export interface ISpeciesEdition {
    id: string,
    gameEdition: string,
    ability?: IAbilityScoreModifierGroup[],
    references?: IReference[],
    speed?: IMovementSpeedGroup
}

export interface ISpell {
    id: string
    slug: string
    name: string
    editions: ISpellEdition[]
    image: IMedia
    lowestLevel: number
    rarity: string
    school: string
}

export interface ISpellTeaser {
    id: string
    slug: string
    name: string
    editions: ISpellEditionTeaser[]
    image: IMediaTeaser
    lowestLevel: number
    rarity: string
    school: string
}

export interface ISpellEdition {
    id: string
    area?: IArea
    castingTime: string
    classLevels: ISpellEditionCharacterClassLevel[]
    description: string
    domains: string[]
    gameEdition: string
    hasSpellResistance?: boolean
    higherLevel: string
    isDefault: boolean
    levels: ISpellLevel[]
    lowestLevel: number
    range: IRange
    references: IReference[]
    savingThrow?: ISavingThrow
    school?: IMagicSchool
    spellComponents?: string
    spellId: string
}

export interface ISpellEditionTeaser {
    id: string
    spell_id: string
    game_edition: string
}


export interface ISpellEditionCharacterClassLevel {
    name: string
    slug: string
    level: number
    type: string
}

export interface ISpellLevel {
    name: string
    level: number
}

export interface ISpellMaterialComponent {
    id: string
    description?: string
    isConsumed: boolean
    isFocus: boolean
    isPlural: boolean
    itemEditionId?: string
    minimumValue?: number
    name: string
    quantity?: number
    quantityText?: string
    spellEditionId?: string
    string?: string
}

export enum RenderMode {
    SHORT = 'short',
    TEASER = 'teaser',
    FULL = 'full',
}
