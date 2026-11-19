import type { MixitupConfig, MixitupOptions } from './config';
import type { MixitupState } from './state';
import type { CommandFilter, CommandInsert, CommandMultimix, CommandRemove, CommandSort } from './commands';
import type { Operation } from '../operation';

type Elements = Element | ArrayLike<Element>;
type InsertContent = Elements | DocumentFragment | string;
type Filter = string | Elements;
type Sort = string | ArrayLike<Element>;
type MixCallback = (this: Element, state: MixitupState, mixer: MixitupMixer) => void;
type MixOptions = [animate?: boolean, callback?: MixCallback] | [callback: MixCallback];

export interface MixitupCommand {
    filter?: Filter | CommandFilter | null;
    sort?: Sort | CommandSort | null;
    insert?: Partial<CommandInsert> | null;
    remove?: CommandRemove | Elements | null;
    changeLayout?: string | { containerClassName: string } | null;
}

export interface MixitupMixer {
    configure(config: MixitupOptions): void;
    show(): Promise<MixitupState>;
    hide(): Promise<MixitupState>;
    filter(selector: Filter, ...options: MixOptions): Promise<MixitupState>;
    toggleOn(selector: string, ...options: MixOptions): Promise<MixitupState>;
    toggleOff(selector: string, ...options: MixOptions): Promise<MixitupState>;
    sort(order: Sort, ...options: MixOptions): Promise<MixitupState>;
    changeLayout(containerClassName: string, ...options: MixOptions): Promise<MixitupState>;
    multimix(command: MixitupCommand, ...options: MixOptions): Promise<MixitupState>;
    dataset(dataset: Array<Record<string, unknown>>, ...options: MixOptions): Promise<MixitupState>;
    tween(operation: Operation, multiplier: number): void;
    insert(elements: InsertContent, ...options: MixOptions): Promise<MixitupState>;
    insert(elements: InsertContent, index: number, ...options: MixOptions): Promise<MixitupState>;
    insertBefore(elements: InsertContent, referenceElement: Element, ...options: MixOptions): Promise<MixitupState>;
    insertAfter(elements: InsertContent, referenceElement: Element, ...options: MixOptions): Promise<MixitupState>;
    prepend(elements: InsertContent, ...options: MixOptions): Promise<MixitupState>;
    append(elements: InsertContent, ...options: MixOptions): Promise<MixitupState>;
    remove(elements: Elements | string | number, ...options: MixOptions): Promise<MixitupState>;
    destroy(cleanUp?: boolean): void;
    forceRefresh(): void;
    forceRender(): void;
    isMixing(): boolean;
    getOperation(command: Partial<CommandMultimix>): Operation | null;
    getConfig(): MixitupConfig;
    getConfig(path: string): unknown;
    getState(): MixitupState;
}
