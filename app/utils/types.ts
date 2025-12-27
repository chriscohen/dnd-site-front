import type {ReferenceApiResponse} from "~/classes/reference";

export type BottomNavItem = {
    anchor: string
    disabled?: boolean
    icon: string
    name: string
};

export type EditionTabData = {
    id: string;
    class: string,
    label: string;
    suffix?: string
    disabled: boolean,
}

export interface PaginatedApiResponse<T> {
    current_page: number,
    data: T | T[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}



export interface IAttackType {
    id: string
    name: string
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
    references: ReferenceApiResponse[]
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

export interface IQueryString {
    editions?: string
    mode?: string
}

export interface SearchResult {
    id: string
    name: string
    slug: string
    type: string
}

export enum ArmorClassSource {
    BASE = 'base',
    NATURAL = 'natural',
    EQUIPMENT = 'equipment'

}

export enum CreatureSizeUnit {
    TINY = 'tiny',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    HUGE = 'huge',
    GARGANTUAN = 'gargantuan'
}

export enum DistanceUnit {
    INCH = 'inch',
    FOOT = 'foot',
    YARD = 'yard',
    METER = 'meter',
    MILE = 'mile'
}

export enum CreatureAgeType {
    WYRMLING = 'wyrmling',
    VERY_YOUNG = 'very young',
    YOUNG = 'young',
    JUVENILE = 'juvenile',
    YOUNG_ADULT = 'young adult',
    ADULT = 'adult',
    MATURE_ADULT = 'mature adult',
    OLD = 'old',
    VERY_OLD = 'very old',
    ANCIENT = 'ancient',
    WYRM = 'wyrm',
    GREAT_WYRM = 'great wyrm',
    MAXIMUM = 'maximum'
}

export enum MovementType {
    BURROW = 'burrow',
    CLIMB = 'climb',
    FLY = 'fly',
    SWIM = 'swim',
    WALK = 'walk'
}

export enum SenseType {
    BLINDSENSE = 'blindsense',
    BLINDSIGHT = 'blindsight',
    DARKVISION = 'darkvision',
    GREENSIGHT = 'greensight',
    INFRAVISION = 'infravision',
    LOW_LIGHT_VISION = 'low light vision',
    MINDSIGHT = 'mindsight',
    SCENT = 'scent',
    TOUCHSIGHT = 'touchsight',
    TREMORSENSE = 'tremorsense',
    TRUESIGHT = 'truesight',
    ULTRAVISION = 'ultravision',
    XRAY_VISION = 'xray vision'
}
