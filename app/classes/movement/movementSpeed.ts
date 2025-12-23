export interface MovementSpeedApiResponse {
    canHover?: boolean
    speed: number
    type?: MovementType
}

export interface MovementSpeedGroupApiResponse {
    burrow?: MovementSpeedApiResponse | number,
    canHover?: boolean,
    climb?: MovementSpeedApiResponse | number,
    fly?: MovementSpeedApiResponse | number,
    swim?: MovementSpeedApiResponse | number,
    walk?: MovementSpeedApiResponse | number
}

export type MovementSpeedState = {
    canHover?: boolean,
    speed?: number,
    type?: MovementType
};

export const createMovementSpeed = (data?: MovementSpeedApiResponse | number | undefined) => {
    const state: MovementSpeedState = {
        canHover: (data === undefined || typeof data === 'number') ? false : data?.canHover,
        speed: typeof data === 'number' ? data : data?.speed,
        type: (data === undefined || typeof data === 'number') ? undefined : data?.type
    }

    return {
        ...state
    }
};



export type MovementSpeed = ReturnType<typeof createMovementSpeed>;
