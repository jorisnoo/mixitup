import type { ConfigLoad } from '../types/config';

export function createDefaultLoad(): ConfigLoad {
    return {
        filter: 'all',
        sort: 'default:asc',
        dataset: null,
    };
}
