import {
    type AbilityScoreApiResponse,
    type AbilityScoresState,
    createAbilityScore
} from "~/classes/abilities/abilityScore";
import {
    type ArmorClass,
    type ArmorClassApiResponse,
    createArmorClass
} from "~/classes/armorClass/armorClass";
import {createLanguage, type Language, type LanguageApiResponse} from "~/classes/language";
import {
    createMovementSpeed,
    type MovementSpeedApiResponse
} from "~/classes/movement/movementSpeed";
import type {ReferenceApiResponse} from "~/classes/reference";
import type {Tag} from "~/classes/tag";
import type {CreatureHitPoints} from "~/classes/creatures/creatureHitPoints";
import type {CreatureSense} from "~/classes/creatures/creatureSense";
import {createCreatureType, type CreatureType, type CreatureTypeApiResponse} from "~/classes/creatures/creatureType";
import {withChallengeRating} from "~/classes/challengeRating";
import {createMovementSpeedsGroup, type MovementSpeedsGroup} from "~/classes/movement/movementSpeedsGroup";
import type {
    AbilityScoreModifierGroupApiResponse,
    AbilityScoreModifierGroupState
} from "~/classes/abilities/abilityScoreModifierGroup";
import {type AlignmentApiResponse, type AlignmentState, createAlignment} from "~/classes/alignment/alignment";

export interface CreatureEditionApiResponse {
    id: string
    gameEdition: string
    abilities?: AbilityScoreApiResponse[]
    abilityScoreModifiers?: AbilityScoreModifierGroupApiResponse
    ages?: Record<CreatureAgeType, number>
    alignment?: AlignmentApiResponse[]
    armorClass?: ArmorClassApiResponse[]
    challengeRating?: number
    conditionImmune?: string[]
    height?: number
    heightModifier?: string
    hitDieFaces?: number
    hitPoints: CreatureHitPoints
    immune?: string[]
    isPlayable?: boolean
    lairXp?: boolean
    languages?: LanguageApiResponse[]
    movementSpeeds?: MovementSpeedApiResponse[]
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
    abilities?: AbilityScoresState
    abilityScoreModifiers?: AbilityScoreModifierGroupState
    alignment?: AlignmentState[]
    armorClass?: ArmorClass[]
    challengeRating?: number
    conditionImmunities?: string[]
    damageImmunities?: string[]
    damageResistances?: string[]
    damageVulnerabilities?: string[]
    hitDieFaces?: number
    hitPoints?: CreatureHitPoints
    isPlayable?: boolean
    lairXp?: boolean
    languages?: Language[]
    movementSpeeds?: MovementSpeedsGroup
    proficiencyBonus?: number
    sizes: CreatureSizeUnit[]
    tags?: Tag[]
    type: CreatureType
};

export const createCreatureEdition = (data?: CreatureEditionApiResponse) => {
    const state = {
        id: data?.id,
        abilities: {
            str: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'STR')),
            dex: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'DEX')),
            con: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'CON')),
            int: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'INT')),
            wis: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'WIS')),
            cha: createAbilityScore(data?.abilities?.find((item: AbilityScoreApiResponse) => item.type === 'CHA')),
        },
        alignment: data?.alignment?.map(createAlignment),
        armorClass: data?.armorClass?.map(createArmorClass),
        challengeRating: data?.challengeRating,
        conditionImmunities: data?.conditionImmune,
        damageImmunities: data?.immune,
        damageResistances: data?.resist,
        hitDieFaces: data?.hitDieFaces,
        hitPoints: data?.hitPoints,
        isPlayable: data?.isPlayable,
        lairXp: data?.lairXp,
        languages: data?.languages?.map(createLanguage),
        movementSpeeds: createMovementSpeedsGroup({
            burrow: createMovementSpeed(data?.movementSpeeds?.find(
                (item: MovementSpeedApiResponse) => item.type === 'burrow')
            ),
            climb: createMovementSpeed(data?.movementSpeeds?.find(
                (item: MovementSpeedApiResponse) => item.type === 'climb')
            ),
            fly: createMovementSpeed(data?.movementSpeeds?.find(
                (item: MovementSpeedApiResponse) => item.type === 'fly')
            ),
            swim: createMovementSpeed(data?.movementSpeeds?.find(
                (item: MovementSpeedApiResponse) => item.type === 'swim')
            ),
            walk: createMovementSpeed(data?.movementSpeeds?.find(
                (item: MovementSpeedApiResponse) => item.type === 'walk')
            ),
        }),
        proficiencyBonus: data?.proficiencyBonus,
        sizes: data?.sizes ?? [],
        tags: data?.tags,
        type: createCreatureType(data?.type)
    }

    const getArmorClass = (): ArmorClass | undefined => {
        return state.armorClass?.[0];
    }

    return {
        ...state,

        getArmorClass,
        ...withChallengeRating(state)
    };
}

export type CreatureEdition = ReturnType<typeof createCreatureEdition>;
