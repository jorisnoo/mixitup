import type { MixitupMixer } from './types/public-api';
import type { MixitupState } from './types/state';

/**
 * A collection wrapper around one or more MixitupMixer instances
 * allowing simultaneous control similar to the MixItUp 2 API.
 */
export class Collection {
    readonly length: number;

    [index: number]: MixitupMixer;

    constructor(instances: MixitupMixer[]) {
        for (let i = 0; i < instances.length; i++) {
            this[i] = instances[i];
        }

        this.length = instances.length;

        Object.freeze(this);
    }

    /**
     * Calls a method on all instances in the collection by passing the method
     * name as a string followed by any applicable parameters.
     */
    mixitup(methodName: string, ...args: any[]): Promise<MixitupState[]> {
        const tasks: Promise<MixitupState>[] = [];

        for (let i = 0; i < this.length; i++) {
            const instance = this[i] as any;
            tasks.push(instance[methodName](...args));
        }

        return Promise.all(tasks);
    }
}
