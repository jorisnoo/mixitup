import type { ConfigBehavior } from '../types/config';

export function createDefaultBehavior(): ConfigBehavior {
    return {
        liveSort: false,
    };
}
