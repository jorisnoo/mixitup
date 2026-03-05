import type { ConfigLayout } from '../types/config';

export function createDefaultLayout(): ConfigLayout {
    return {
        allowNestedTargets: true,
        containerClassName: '',
        siblingBefore: null,
        siblingAfter: null,
    };
}
