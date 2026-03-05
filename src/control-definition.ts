export interface ControlDefinition {
    readonly type: string;
    readonly selector: string;
    readonly live: boolean;
    readonly parent: string;
}

export function createControlDefinition(
    type: string,
    selector: string,
    live: boolean = false,
    parent: string = ''
): ControlDefinition {
    return Object.freeze({ type, selector, live, parent });
}

export const controlDefinitions: ControlDefinition[] = [
    createControlDefinition('multimix', '[data-filter][data-sort]'),
    createControlDefinition('filter', '[data-filter]'),
    createControlDefinition('sort', '[data-sort]'),
    createControlDefinition('toggle', '[data-toggle]'),
];
