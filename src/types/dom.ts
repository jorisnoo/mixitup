export interface MixerDom {
    document: Document | null;
    body: HTMLElement | null;
    container: Element | null;
    parent: Element | null;
    targets: Element[];
}

export interface TargetDom {
    el: Element | null;
}
