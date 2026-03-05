import type { UserInstruction } from './user-instruction';

export interface QueueItem {
    args: any[];
    instruction: UserInstruction | null;
    triggerElement: Element | null;
    deferred: {
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
        promise: Promise<any>;
    } | null;
    isToggling: boolean;
}

export function createQueueItem(): QueueItem {
    return {
        args: [],
        instruction: null,
        triggerElement: null,
        deferred: null,
        isToggling: false,
    };
}
