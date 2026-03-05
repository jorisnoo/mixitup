import type { ConfigData } from '../types/config';

export function createDefaultData(): ConfigData {
    return {
        uidKey: '',
        dirtyCheck: false,
    };
}
