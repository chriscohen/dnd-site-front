export interface AbilityScoresApiResponse {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
}

export interface AbilityScoreModifierGroupApiResponse {
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

export type AbilityScoreState = {
    value: number
}

export const createAbilityScore = (data?: number) => {
    const state: AbilityScoreState = {
        value: data ?? 0
    }

    return {
        ...state,

        ...withAbilityScore(state)
    }
}

export const withAbilityScore = (state: AbilityScoreState) => ({
    modifier: (): number => Math.floor((state.value - 10) / 2),
    modifierLabel: (): string => {
        const modifier = Math.floor((state.value - 10) / 2);
        return modifier < 0 ? modifier.toString() : `+${modifier}`;
    }
});

export type AbilityScore = ReturnType<typeof createAbilityScore>;
