import type { CommandFilter } from './commands';
import type { CommandSort } from './commands';

export interface MixitupState {
    readonly id: string;
    readonly activeFilter: CommandFilter | null;
    readonly activeSort: CommandSort | null;
    readonly activeContainerClassName: string;
    readonly container: Element | null;
    readonly targets: Element[];
    readonly hide: Element[];
    readonly show: Element[];
    readonly matching: Element[];
    readonly totalTargets: number;
    readonly totalShow: number;
    readonly totalHide: number;
    readonly totalMatching: number;
    readonly hasFailed: boolean;
    readonly triggerElement: Element | null;
    readonly activeDataset: Array<Record<string, unknown>> | null;
}
