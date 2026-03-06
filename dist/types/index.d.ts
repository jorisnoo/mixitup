/**
 * A collection wrapper around one or more MixitupMixer instances
 * allowing simultaneous control similar to the MixItUp 2 API.
 */
export declare class Collection {
    readonly length: number;
    [index: number]: MixitupMixer;
    constructor(instances: MixitupMixer[]);
    /**
     * Calls a method on all instances in the collection by passing the method
     * name as a string followed by any applicable parameters.
     */
    mixitup(methodName: string, ...args: any[]): Promise<MixitupState[]>;
}

export declare interface CommandChangeLayout {
    containerClassName: string;
}

export declare interface CommandDataset {
    dataset: Array<Record<string, unknown>> | null;
}

export declare interface CommandFilter {
    selector: string;
    collection: Element[] | null;
    action: 'show' | 'hide';
}

export declare interface CommandInsert {
    index: number;
    collection: Element[];
    position: 'before' | 'after';
    sibling: Element | null;
}

export declare interface CommandMultimix {
    filter: CommandFilter | null;
    sort: CommandSort | null;
    insert: CommandInsert | null;
    remove: CommandRemove | null;
    changeLayout: CommandChangeLayout | null;
}

export declare interface CommandRemove {
    targets: Element[];
    collection: Element[];
}

export declare interface CommandSort {
    sortString: string;
    attribute: string;
    order: string;
    collection: Element[] | null;
    next: CommandSort | null;
}

export declare interface ConfigAnimation {
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

export declare interface ConfigBehavior {
    liveSort: boolean;
}

export declare interface ConfigCallbacks {
    onMixStart: ((state: MixitupState, futureState: MixitupState, instance: any) => void) | null;
    onMixBusy: ((state: MixitupState, instance: any) => void) | null;
    onMixEnd: ((state: MixitupState, instance: any) => void) | null;
    onMixFail: ((state: MixitupState, instance: any) => void) | null;
    onMixClick: ((this: Element, state: MixitupState, originalEvent: Event, instance: any) => void | false) | null;
}

export declare interface ConfigClassNames {
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

export declare interface ConfigControls {
    enable: boolean;
    live: boolean;
    scope: 'global' | 'local';
    toggleLogic: 'or' | 'and';
    toggleDefault: 'all' | 'none';
}

export declare interface ConfigData {
    uidKey: string;
    dirtyCheck: boolean;
}

export declare interface ConfigDebug {
    enable: boolean;
    showWarnings: boolean;
    fauxAsync: boolean;
}

export declare interface ConfigLayout {
    allowNestedTargets: boolean;
    containerClassName: string;
    siblingBefore: HTMLElement | null;
    siblingAfter: HTMLElement | null;
}

export declare interface ConfigLoad {
    filter: string;
    sort: string;
    dataset: Array<Record<string, unknown>> | null;
}

export declare interface ConfigRender {
    target: ((data: Record<string, unknown>) => string | HTMLElement) | null;
}

export declare interface ConfigSelectors {
    target: string;
    control: string;
}

export declare interface ConfigTemplates {
}

declare class Control {
    el: HTMLElement | null;
    selector: string;
    bound: any[];
    pending: number;
    type: string;
    status: ControlStatus;
    filter: string;
    sort: string;
    canDisable: boolean;
    handler: ((e: Event) => void) | null;
    classNames: UiClassNames;
    init(el: HTMLElement, type: string, selector: string): void;
    isBound(mixer: any): boolean;
    addBinding(mixer: any): void;
    removeBinding(mixer: any): void;
    bindClick(): void;
    unbindClick(): void;
    handleClick(e: MouseEvent): void;
    update(command: any, toggleArray: string[]): void;
    updateLive(command: any, toggleArray: string[]): void;
    parseStatusChange(button: HTMLElement, command: any, actions: Record<string, any>, toggleArray: string[]): void;
    renderStatus(button: HTMLElement, status: ControlStatus): void;
}

declare type ControlStatus = 'inactive' | 'active' | 'disabled' | 'live';

/**
 * Returns the current document scroll and viewport state.
 */
declare function getDocumentState(doc?: Document): {
    scrollTop: number;
    scrollLeft: number;
    docHeight: number;
    docWidth: number;
    viewportHeight: number;
    viewportWidth: number;
};

declare interface IMoveData {
    posIn: StyleData | null;
    posOut: StyleData | null;
    operation: unknown;
    callback: ((target: unknown, operation: unknown) => void) | null;
    statusChange: string;
    duration: number;
    staggerIndex: number;
    tweenData: Record<string, any>;
}

declare interface Messages {
    [key: string]: string | ((...args: any[]) => string);
}

export declare const messages: Messages;

export declare class Mixer implements MixitupMixer {
    config: MixitupConfig;
    id: string;
    isBusy: boolean;
    isToggling: boolean;
    incPadding: boolean;
    controls: Control[];
    targets: Target[];
    origOrder: Target[];
    cache: Record<string, Target>;
    toggleArray: string[];
    targetsMoved: number;
    targetsImmovable: number;
    targetsBound: number;
    targetsDone: number;
    staggerDuration: number;
    effectsIn: StyleData | null;
    effectsOut: StyleData | null;
    transformIn: string[];
    transformOut: string[];
    queue: QueueItem[];
    state: MixitupState | null;
    lastOperation: Operation | null;
    lastClicked: Element | null;
    userCallback: ((...args: any[]) => void) | null;
    userDeferred: {
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
        promise: Promise<any>;
    } | null;
    dom: MixerDom;
    attach(container: HTMLElement, doc: Document, id: string, config?: Partial<MixitupConfig>): void;
    private sanitizeConfig;
    private getInitialState;
    private cacheDom;
    private indexTargets;
    private initControls;
    private getControl;
    private getToggleSelector;
    private buildToggleArray;
    private splitCompoundSelector;
    private updateControls;
    private buildSortString;
    private insertTargets;
    private getNextSibling;
    private filterOperation;
    private evaluateHideShow;
    private sortOperation;
    private compare;
    private getAttributeValue;
    private printSort;
    private parseSortString;
    private parseEffects;
    private parseEffect;
    private buildState;
    private createMutableState;
    private goMix;
    private createDeferred;
    private getStartMixData;
    private setInter;
    private getInterMixData;
    private setFinal;
    private getFinalMixData;
    private getTweenData;
    private moveTargets;
    private hasEffect;
    private willTransition;
    private checkProgress;
    private cleanUp;
    private parseMultimixArgs;
    private parseFilterArgs;
    private parseSortArgs;
    private parseInsertArgs;
    private parseRemoveArgs;
    private parseDatasetArgs;
    private parseChangeLayoutArgs;
    private queueMix;
    private getDataOperation;
    private diffDatasets;
    private insertDatasetFrag;
    private willSortCheck;
    show(): Promise<MixitupState>;
    hide(): Promise<MixitupState>;
    isMixing(): boolean;
    filter(...args: any[]): Promise<MixitupState>;
    toggleOn(...args: any[]): Promise<MixitupState>;
    toggleOff(...args: any[]): Promise<MixitupState>;
    sort(...args: any[]): Promise<MixitupState>;
    changeLayout(...args: any[]): Promise<MixitupState>;
    multimix(...args: any[]): Promise<MixitupState>;
    dataset(...args: any[]): Promise<MixitupState>;
    getOperation(multimixCommand: Partial<CommandMultimix>): Operation | null;
    tween(operation: any, multiplier: number): void;
    insert(...args: any[]): Promise<MixitupState>;
    insertBefore(...args: any[]): Promise<MixitupState>;
    insertAfter(...args: any[]): Promise<MixitupState>;
    prepend(...args: any[]): Promise<MixitupState>;
    append(...args: any[]): Promise<MixitupState>;
    remove(...args: any[]): Promise<MixitupState>;
    getConfig(stringKey?: string): MixitupConfig | unknown;
    configure(config: Partial<MixitupConfig>): void;
    getState(): MixitupState;
    forceRefresh(): void;
    forceRender(): void;
    destroy(cleanUp?: boolean): void;
}

declare interface MixerDom {
    document: Document | null;
    body: Element | null;
    container: HTMLElement | null;
    parent: HTMLElement | null;
    targets: Element[];
}

/**
 * The `mixitup()` factory function creates and returns individual instances
 * of MixItUp, known as "mixers", on which API methods can be called.
 *
 * @param container - A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
 * @param config - An optional configuration object used to customize the behavior of the MixItUp instance.
 * @param foreignDoc - An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
 * @returns A "mixer" object holding the MixItUp instance.
 */
declare function mixitup(container: Element | string, config?: Partial<MixitupConfig>, foreignDoc?: Document): MixitupMixer;

/**
 * Internal overload for multi-element initialization via Collection.
 */
declare function mixitup(container: Element | string | ArrayLike<Element>, config?: Partial<MixitupConfig>, foreignDoc?: Document, returnCollection?: boolean): MixitupMixer | Collection;
export default mixitup;

export declare interface MixitupConfig {
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

export declare interface MixitupMixer {
    configure(config: Partial<MixitupConfig>): void;
    show(): Promise<MixitupState>;
    hide(): Promise<MixitupState>;
    filter(selector: string | Element[]): Promise<MixitupState>;
    toggleOn(selector: string): Promise<MixitupState>;
    toggleOff(selector: string): Promise<MixitupState>;
    sort(sortString: string): Promise<MixitupState>;
    changeLayout(containerClassName: string): Promise<MixitupState>;
    multimix(command: Partial<CommandMultimix>): Promise<MixitupState>;
    dataset(dataset: Array<Record<string, unknown>>): Promise<MixitupState>;
    tween(operation: unknown, multiplier: number): void;
    insert(elements: Element | Element[], index?: number): Promise<MixitupState>;
    insertBefore(elements: Element | Element[], referenceElement: Element): Promise<MixitupState>;
    insertAfter(elements: Element | Element[], referenceElement: Element): Promise<MixitupState>;
    prepend(elements: Element | Element[]): Promise<MixitupState>;
    append(elements: Element | Element[]): Promise<MixitupState>;
    remove(elements: Element | Element[] | string): Promise<MixitupState>;
    destroy(hideTargets?: boolean): void;
    forceRefresh(): void;
    forceRender(): void;
    isMixing(): boolean;
    getOperation(command: Partial<CommandMultimix>): unknown;
    getConfig(path?: string): MixitupConfig | unknown;
    getState(): MixitupState;
}

export declare interface MixitupState {
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

declare interface Operation {
    id: string;
    args: any[];
    command: CommandMultimix | null;
    showPosData: any[];
    toHidePosData: any[];
    startState: MixitupState | null;
    newState: MixitupState | null;
    docState: ReturnType<getDocumentState> | null;
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

declare interface QueueItem {
    args: any[];
    instruction: UserInstruction | null;
    triggerElement: Element | null;
    deferred: {
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
        promise: Promise<any>;
    } | null;
    isToggling: boolean;
}

declare interface StyleData {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
    marginRight: number;
    marginBottom: number;
    opacity: number;
    scale: TransformData;
    translateX: TransformData;
    translateY: TransformData;
    translateZ: TransformData;
    rotateX: TransformData;
    rotateY: TransformData;
    rotateZ: TransformData;
}

declare class Target {
    id: string;
    sortString: string | number;
    mixer: any;
    callback: ((target: Target, operation: Operation) => void) | null;
    isShown: boolean;
    isBound: boolean;
    isExcluded: boolean;
    isInDom: boolean;
    handler: ((e: Event) => void) | null;
    operation: Operation | null;
    data: Record<string, unknown> | null;
    dom: TargetDom;
    init(el: Element | null, mixer: any, data?: Record<string, unknown>): void;
    render(data: Record<string, unknown>): Element;
    cacheDom(el: Element): void;
    getSortString(attributeName: string): void;
    show(): void;
    hide(): void;
    move(moveData: IMoveData): void;
    applyTween(posData: IMoveData, multiplier: number): void;
    applyStylesIn(moveData: IMoveData): void;
    applyStylesOut(moveData: IMoveData): void;
    writeTransitionRule(property: string, staggerIndex: number, duration?: number): string;
    getDelay(index: number): number;
    applyTransition(rules: string[]): void;
    handleTransitionEnd(e: TransitionEvent): void;
    bindEvents(): void;
    unbindEvents(): void;
    getPosData(getBox?: boolean): StyleData;
    cleanUp(): void;
}

declare interface TargetDom {
    el: Element | null;
}

/**
 * Compiles a template string with ${placeholder} syntax into a render function.
 */
export declare function template(str: string): (data?: Record<string, any>) => string;

declare interface TransformData {
    value: number;
    unit: string;
}

declare interface UiClassNames {
    base: string;
    active: string;
    disabled: string;
}

declare interface UserInstruction {
    command: Partial<CommandMultimix> | Record<string, any>;
    animate: boolean;
    callback: ((...args: any[]) => void) | null;
}

export { }
