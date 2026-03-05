import type { ConfigControls } from '../types/config';

export function createDefaultControls(): ConfigControls {
    return {
        enable: true,
        live: false,
        scope: 'global',
        toggleLogic: 'or',
        toggleDefault: 'all',
    };
}
