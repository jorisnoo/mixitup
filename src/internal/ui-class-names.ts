export interface UiClassNames {
    base: string;
    active: string;
    disabled: string;
}

export function createUiClassNames(): UiClassNames {
    return {
        base: '',
        active: '',
        disabled: '',
    };
}
