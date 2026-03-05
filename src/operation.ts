import type { CommandMultimix } from './types/commands';
import type { CommandFilter, CommandSort } from './types/commands';
import type { MixitupState } from './types/state';
import type { StyleData } from './types/style-data';

export interface Operation {
    id: string;
    args: any[];
    command: CommandMultimix | null;
    showPosData: any[];
    toHidePosData: any[];
    startState: MixitupState | null;
    newState: MixitupState | null;
    docState: ReturnType<typeof import('./helpers').getDocumentState> | null;
    willSort: boolean;
    willChangeLayout: boolean;
    hasEffect: boolean;
    hasFailed: boolean;
    triggerElement: Element | null;
    show: any[];
    hide: any[];
    matching: any[];
    toShow: any[];
    toHide: any[];
    toMove: any[];
    toRemove: any[];
    startOrder: any[];
    newOrder: any[];
    startSort: CommandSort | null;
    newSort: CommandSort | null;
    startFilter: CommandFilter | null;
    newFilter: CommandFilter | null;
    startDataset: Array<Record<string, unknown>> | null;
    newDataset: Array<Record<string, unknown>> | null;
    viewportDeltaX: number;
    viewportDeltaY: number;
    startX: number;
    startY: number;
    startHeight: number;
    startWidth: number;
    newX: number;
    newY: number;
    newHeight: number;
    newWidth: number;
    startContainerClassName: string;
    startDisplay: string;
    newContainerClassName: string;
    newDisplay: string;
}

export function createOperation(): Operation {
    return {
        id: '',
        args: [],
        command: null,
        showPosData: [],
        toHidePosData: [],
        startState: null,
        newState: null,
        docState: null,
        willSort: false,
        willChangeLayout: false,
        hasEffect: false,
        hasFailed: false,
        triggerElement: null,
        show: [],
        hide: [],
        matching: [],
        toShow: [],
        toHide: [],
        toMove: [],
        toRemove: [],
        startOrder: [],
        newOrder: [],
        startSort: null,
        newSort: null,
        startFilter: null,
        newFilter: null,
        startDataset: null,
        newDataset: null,
        viewportDeltaX: 0,
        viewportDeltaY: 0,
        startX: 0,
        startY: 0,
        startHeight: 0,
        startWidth: 0,
        newX: 0,
        newY: 0,
        newHeight: 0,
        newWidth: 0,
        startContainerClassName: '',
        startDisplay: '',
        newContainerClassName: '',
        newDisplay: '',
    };
}
