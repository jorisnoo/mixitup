import type { CommandMultimix } from '../types/commands';

export interface UserInstruction {
    command: Partial<CommandMultimix> | Record<string, any>;
    animate: boolean;
    callback: ((...args: any[]) => void) | null;
}

export function createUserInstruction(): UserInstruction {
    return {
        command: {},
        animate: false,
        callback: null,
    };
}
