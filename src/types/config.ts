import type { MixitupState } from './state';

export interface ConfigAnimation {
    enable: boolean;
    effects: string;
    effectsIn: string;
    effectsOut: string;
    duration: number;
    easing: string;
    applyPerspective: boolean;
    perspectiveDistance: string;
    perspectiveOrigin: string;
    queue: boolean;
    queueLimit: number;
    animateResizeContainer: boolean;
    animateResizeTargets: boolean;
    staggerSequence: ((i: number) => number) | null;
    reverseOut: boolean;
    nudge: boolean;
    clampHeight: boolean;
    clampWidth: boolean;
}

export interface ConfigBehavior {
    liveSort: boolean;
}

export interface ConfigCallbacks {
    onMixStart: ((state: MixitupState, futureState: MixitupState) => void) | null;
    onMixBusy: ((state: MixitupState) => void) | null;
    onMixEnd: ((state: MixitupState) => void) | null;
    onMixFail: ((state: MixitupState) => void) | null;
    onMixClick: ((this: Element, state: MixitupState, originalEvent: Event) => void | false) | null;
}

export interface ConfigControls {
    enable: boolean;
    live: boolean;
    scope: 'global' | 'local';
    toggleLogic: 'or' | 'and';
    toggleDefault: 'all' | 'none';
}

export interface ConfigClassNames {
    block: string;
    elementContainer: string;
    elementFilter: string;
    elementSort: string;
    elementMultimix: string;
    elementToggle: string;
    modifierActive: string;
    modifierDisabled: string;
    modifierFailed: string;
    delineatorElement: string;
    delineatorModifier: string;
}

export interface ConfigData {
    uidKey: string;
    dirtyCheck: boolean;
}

export interface ConfigDebug {
    enable: boolean;
    showWarnings: boolean;
    fauxAsync: boolean;
}

export interface ConfigLayout {
    allowNestedTargets: boolean;
    containerClassName: string;
    siblingBefore: HTMLElement | null;
    siblingAfter: HTMLElement | null;
}

export interface ConfigLoad {
    filter: string;
    sort: string;
    dataset: Array<Record<string, unknown>> | null;
}

export interface ConfigRender {
    target: ((data: Record<string, unknown>) => string | HTMLElement) | null;
}

export interface ConfigSelectors {
    target: string;
    control: string;
}

export interface ConfigTemplates {
    // Reserved for future use / extensions
}

export interface MixitupConfig {
    animation: ConfigAnimation;
    behavior: ConfigBehavior;
    callbacks: ConfigCallbacks;
    controls: ConfigControls;
    classNames: ConfigClassNames;
    data: ConfigData;
    debug: ConfigDebug;
    layout: ConfigLayout;
    load: ConfigLoad;
    render: ConfigRender;
    selectors: ConfigSelectors;
    templates: ConfigTemplates;
}
