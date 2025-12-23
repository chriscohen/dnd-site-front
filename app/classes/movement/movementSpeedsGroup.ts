import {
    createMovementSpeed,
    type MovementSpeed,
    type MovementSpeedApiResponse,
    type MovementSpeedState
} from "~/classes/movement/movementSpeed";

export interface MovementSpeedsGroupApiResponse {
    burrow?: MovementSpeedApiResponse | number,
    climb?: MovementSpeedApiResponse | number,
    fly?: MovementSpeedApiResponse | number,
    swim?: MovementSpeedApiResponse | number,
    walk?: MovementSpeedApiResponse | number
}

export type MovementSpeedsGroupState = {
    burrow?: MovementSpeed,
    climb?: MovementSpeed,
    fly?: MovementSpeed,
    swim?: MovementSpeed,
    walk?: MovementSpeed
}

export const createMovementSpeedsGroup = (data?: MovementSpeedsGroupApiResponse) => {
    const state = {
        burrow: createMovementSpeed(data?.burrow),
        climb: createMovementSpeed(data?.climb),
        fly: createMovementSpeed(data?.fly),
        swim: createMovementSpeed(data?.swim),
        walk: createMovementSpeed(data?.walk),
    }

    return {
        ...state,

        ...withMovementSpeedsGroup(state)
    }
}

export const withMovementSpeedsGroup = (state: MovementSpeedsGroupState) => ({
    toString: () => {
        const output: string[] = [];
        Object.entries(state).map(([key, value]) => {
            return value?.speed && output.push(`${key} ${value.speed}`);
        });
        return output.join(', ');
    }
});

export type MovementSpeedsGroup = ReturnType<typeof createMovementSpeedsGroup>;
