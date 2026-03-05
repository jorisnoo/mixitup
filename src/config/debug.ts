import type { ConfigDebug } from '../types/config';

export function createDefaultDebug(): ConfigDebug {
    return {
        enable: false,
        showWarnings: true,
        fauxAsync: false,
    };
}
