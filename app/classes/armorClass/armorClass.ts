import {
    type ArmorClassItem,
    type ArmorClassItemApiResponse,
    type ArmorClassItemState,
    createArmorClassItem
} from "~/classes/armorClass/armorClassItem";
import {BASE_ARMOR_CLASS} from "~/utils/constants";

export interface ArmorClassApiResponse {
    id: string,
    items: ArmorClassItemApiResponse[]
}

export type ArmorClassState = {
    id?: string
    items?: ArmorClassItemState[]
};

export const createArmorClass = (data?: ArmorClassApiResponse) => {
    const state: ArmorClassState = {
        id: data?.id,
        items: data?.items?.map(createArmorClassItem)
    }

    return {
        ...state,

        ...withArmorClass(state)
    }
};

export const withArmorClass = (state: ArmorClassState) => ({
    from: (): string => {
        const output: string[] = [];
        state.items?.forEach((item: ArmorClassItem) => item?.source ? output.push(item?.source) : null);
        return output.join(', ');
    },
    total: (dexModifier?: number): number => {
        console.log('dex' + dexModifier)
        return BASE_ARMOR_CLASS + (state.items?.reduce(
            (total: number, item: ArmorClassItem) => total + (item?.value ?? 0), 0
        ) ?? 0) + (dexModifier ?? 0);
    }
});

export type ArmorClass = ReturnType<typeof createArmorClass>;
