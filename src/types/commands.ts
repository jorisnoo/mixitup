export interface CommandFilter {
    selector: string;
    collection: Element[] | null;
    action: 'show' | 'hide';
}

export interface CommandSort {
    sortString: string;
    attribute: string;
    order: string;
    collection: Element[] | null;
    next: CommandSort | null;
}

export interface CommandInsert {
    index: number;
    collection: Element[];
    position: 'before' | 'after';
    sibling: Element | null;
}

export interface CommandRemove {
    targets: Element[];
    collection: Element[];
}

export interface CommandDataset {
    dataset: Array<Record<string, unknown>> | null;
}

export interface CommandChangeLayout {
    containerClassName: string;
}

export interface CommandMultimix {
    filter: CommandFilter | null;
    sort: CommandSort | null;
    insert: CommandInsert | null;
    remove: CommandRemove | null;
    changeLayout: CommandChangeLayout | null;
}

export function createCommandFilter(): CommandFilter {
    return {
        selector: '',
        collection: null,
        action: 'show',
    };
}

export function createCommandSort(): CommandSort {
    return {
        sortString: '',
        attribute: '',
        order: 'asc',
        collection: null,
        next: null,
    };
}

export function createCommandInsert(): CommandInsert {
    return {
        index: 0,
        collection: [],
        position: 'before',
        sibling: null,
    };
}

export function createCommandRemove(): CommandRemove {
    return {
        targets: [],
        collection: [],
    };
}

export function createCommandDataset(): CommandDataset {
    return {
        dataset: null,
    };
}

export function createCommandChangeLayout(): CommandChangeLayout {
    return {
        containerClassName: '',
    };
}

export function createCommandMultimix(): CommandMultimix {
    return {
        filter: null,
        sort: null,
        insert: null,
        remove: null,
        changeLayout: null,
    };
}
