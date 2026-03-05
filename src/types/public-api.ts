import type { MixitupConfig } from './config';
import type { MixitupState } from './state';
import type { CommandMultimix } from './commands';

export interface MixitupMixer {
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
