import type { ConfigCallbacks } from '../types/config';

export function createDefaultCallbacks(): ConfigCallbacks {
    return {
        onMixStart: null,
        onMixBusy: null,
        onMixEnd: null,
        onMixFail: null,
        onMixClick: null,
    };
}
