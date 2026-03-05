import type { ConfigClassNames } from '../types/config';

export function createDefaultClassNames(): ConfigClassNames {
    return {
        block: 'mixitup',
        elementContainer: 'container',
        elementFilter: 'control',
        elementSort: 'control',
        elementMultimix: 'control',
        elementToggle: 'control',
        modifierActive: 'active',
        modifierDisabled: 'disabled',
        modifierFailed: 'failed',
        delineatorElement: '-',
        delineatorModifier: '-',
    };
}
