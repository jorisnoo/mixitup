import type { ConfigSelectors } from '../types/config';

export function createDefaultSelectors(): ConfigSelectors {
    return {
        target: '.mix',
        control: '',
    };
}
