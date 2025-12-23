import type {
    RangeApiResponse, ISavingThrow,
    ISpellEditionCharacterClassLevel,
} from "~/utils/types";
import type {MediaApiResponse} from "~/classes/media";
import type {ReferenceApiResponse} from "~/classes/reference";
import type {AreaApiResponse} from "~/classes/units";
import type {MagicSchoolApiResponse} from "~/classes/magic";

export interface SpellApiResponse {
    id: string
    slug: string
    name: string
    editions: SpellEditionApiResponse[]
    image: MediaApiResponse
    lowestLevel: number
    rarity: string
    school: string
}

export interface SpellEditionApiResponse {
    id: string
    area?: AreaApiResponse
    castingTime: string
    classLevels: ISpellEditionCharacterClassLevel[]
    description: string
    domains: string[]
    gameEdition: string
    hasSpellResistance?: boolean
    higherLevel: string
    isDefault: boolean
    levels: SpellLevelApiResponse[]
    lowestLevel: number
    range: RangeApiResponse
    references: ReferenceApiResponse[]
    savingThrow?: ISavingThrow
    school?: MagicSchoolApiResponse
    spellComponents?: string
    spellId: string
}

export interface SpellMaterialComponentApiResponse {
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

export interface SpellLevelApiResponse {
    name: string
    level: number
}
