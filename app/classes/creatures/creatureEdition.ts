import {
    type AbilityScore,
    type AbilityScoreModifierGroupApiResponse,
    type AbilityScoresApiResponse, createAbilityScore
} from "~/classes/abilityScore";
import {
    type ArmorClass,
    type ArmorClassApiResponse,
    createArmorClass
} from "~/classes/armorClass/armorClass";
import {createLanguage, type Language, type LanguageApiResponse} from "~/classes/language";
import {createMovementSpeed, type MovementSpeed, type MovementSpeedGroupApiResponse} from "~/classes/movement/movementSpeed";
import type {ReferenceApiResponse} from "~/classes/reference";
import type {Tag} from "~/classes/tag";
import type {CreatureHitPoints} from "~/classes/creatures/creatureHitPoints";
import type {CreatureSense} from "~/classes/creatures/creatureSense";
import {createCreatureType, type CreatureType, type CreatureTypeApiResponse} from "~/classes/creatures/creatureType";
import {withChallengeRating} from "~/classes/challengeRating";
import {
    createMovementSpeedsGroup,
    type MovementSpeedsGroup,
    withMovementSpeedsGroup
} from "~/classes/movement/movementSpeedsGroup";

export interface CreatureEditionApiResponse {
    id: string
    gameEdition: string
    abilities?: AbilityScoresApiResponse
    abilityScoreModifiers?: AbilityScoreModifierGroupApiResponse
    ages?: Record<CreatureAgeType, number>
    armorClass?: ArmorClassApiResponse
    challengeRating?: number
    conditionImmune?: string[]
    height?: number
    heightModifier?: string
    hitPoints: CreatureHitPoints
    immune?: string[]
    isPlayable?: boolean
    languages?: LanguageApiResponse[]
    movementSpeeds?: MovementSpeedGroupApiResponse
    proficiencyBonus?: number
    refrences?: ReferenceApiResponse[]
    resist?: string[]
    senses?: CreatureSense[]
    sizes?: CreatureSizeUnit[]
    tags?: Tag[]
    type: CreatureTypeApiResponse
    weight?: number
    weightModifier?: string
}

export type CreatureEditionState = {
    id?: string
    abilities?: {
        str?: AbilityScore,
        dex?: AbilityScore,
        con?: AbilityScore,
        int?: AbilityScore,
        wis?: AbilityScore,
        cha?: AbilityScore
    }
    armorClass?: ArmorClass
    challengeRating?: number
    conditionImmunities?: string[]
    damageImmunities?: string[]
    damageResistances?: string[]
    damageVulnerabilities?: string[]
    hitPoints?: CreatureHitPoints
    isPlayable?: boolean
    languages?: Language[]
    movementSpeeds?: MovementSpeedsGroup
    proficiencyBonus?: number
    sizes: CreatureSizeUnit[]
    tags?: Tag[]
    type: CreatureType
};

export const createCreatureEdition = (data?: CreatureEditionApiResponse): CreatureEditionState => {
    const state = {
        id: data?.id,
        abilities: {
            str: createAbilityScore(data?.abilities?.str),
            dex: createAbilityScore(data?.abilities?.dex),
            con: createAbilityScore(data?.abilities?.con),
            int: createAbilityScore(data?.abilities?.int),
            wis: createAbilityScore(data?.abilities?.wis),
            cha: createAbilityScore(data?.abilities?.cha),
        },
        armorClass: createArmorClass(data?.armorClass),
        challengeRating: data?.challengeRating,
        conditionImmunities: data?.conditionImmune,
        damageImmunities: data?.immune,
        damageResistances: data?.resist,
        hitPoints: data?.hitPoints,
        isPlayable: data?.isPlayable,
        languages: data?.languages?.map(createLanguage),
        movementSpeeds: createMovementSpeedsGroup(data?.movementSpeeds),
        proficiencyBonus: data?.proficiencyBonus,
        sizes: data?.sizes ?? [],
        tags: data?.tags,
        type: createCreatureType(data?.type)
    }

    return {
        ...state,

        ...withChallengeRating(state)
    };
}

export type CreatureEdition = ReturnType<typeof createCreatureEdition>;
