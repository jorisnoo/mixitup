import type { MixitupConfig } from './types/config';
import type { MixitupMixer } from './types/public-api';

import { Mixer, instances } from './mixer';
import { Collection } from './collection';
import { messages } from './messages';
import { isElement, randomHex, template } from './helpers';

// Re-export public types for consumer use
export type { MixitupConfig } from './types/config';
export type {
    ConfigAnimation,
    ConfigBehavior,
    ConfigCallbacks,
    ConfigControls,
    ConfigClassNames,
    ConfigData,
    ConfigDebug,
    ConfigLayout,
    ConfigLoad,
    ConfigRender,
    ConfigSelectors,
    ConfigTemplates,
} from './types/config';
export type { MixitupState } from './types/state';
export type { MixitupMixer } from './types/public-api';
export type {
    CommandFilter,
    CommandSort,
    CommandInsert,
    CommandRemove,
    CommandDataset,
    CommandChangeLayout,
    CommandMultimix,
} from './types/commands';

/**
 * Creates a facade object that exposes only the public API methods
 * of a Mixer instance, preventing direct access to internals.
 */
function createFacade(mixer: Mixer): MixitupMixer {
    const facade: MixitupMixer = {
        configure: mixer.configure.bind(mixer),
        show: mixer.show.bind(mixer),
        hide: mixer.hide.bind(mixer),
        filter: mixer.filter.bind(mixer),
        toggleOn: mixer.toggleOn.bind(mixer),
        toggleOff: mixer.toggleOff.bind(mixer),
        sort: mixer.sort.bind(mixer),
        changeLayout: mixer.changeLayout.bind(mixer),
        multimix: mixer.multimix.bind(mixer),
        dataset: mixer.dataset.bind(mixer),
        tween: mixer.tween.bind(mixer),
        insert: mixer.insert.bind(mixer),
        insertBefore: mixer.insertBefore.bind(mixer),
        insertAfter: mixer.insertAfter.bind(mixer),
        prepend: mixer.prepend.bind(mixer),
        append: mixer.append.bind(mixer),
        remove: mixer.remove.bind(mixer),
        destroy: mixer.destroy.bind(mixer),
        forceRefresh: mixer.forceRefresh.bind(mixer),
        forceRender: mixer.forceRender.bind(mixer),
        isMixing: mixer.isMixing.bind(mixer),
        getOperation: mixer.getOperation.bind(mixer),
        getConfig: mixer.getConfig.bind(mixer),
        getState: mixer.getState.bind(mixer),
    };

    return Object.freeze(facade);
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
function mixitup(
    container: Element | string,
    config?: Partial<MixitupConfig>,
    foreignDoc?: Document,
): MixitupMixer;

/**
 * Internal overload for multi-element initialization via Collection.
 */
function mixitup(
    container: Element | string | ArrayLike<Element>,
    config?: Partial<MixitupConfig>,
    foreignDoc?: Document,
    returnCollection?: boolean,
): MixitupMixer | Collection;

function mixitup(
    container: Element | string | ArrayLike<Element>,
    config?: Partial<MixitupConfig>,
    foreignDoc?: Document,
    returnCollection?: boolean,
): MixitupMixer | Collection {
    const doc = foreignDoc || window.document;

    let elements: ArrayLike<Element>;

    if (typeof container === 'string') {
        elements = doc.querySelectorAll(container);
    } else if (container && typeof container === 'object' && isElement(container as Element, doc)) {
        elements = [container as Element];
    } else if (container && typeof container === 'object' && 'length' in container) {
        elements = container as ArrayLike<Element>;
    } else {
        throw new Error((messages.errorFactoryInvalidContainer as () => string)());
    }

    if (elements.length < 1) {
        throw new Error((messages.errorFactoryContainerNotFound as () => string)());
    }

    const mixerInstances: MixitupMixer[] = [];

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;

        if (i > 0 && !returnCollection) break;

        let id: string;

        if (!el.id) {
            id = 'MixItUp' + randomHex();
            el.id = id;
        } else {
            id = el.id;
        }

        let instance: Mixer;
        let facade: MixitupMixer;

        if (instances.has(id)) {
            instance = instances.get(id)!;

            if (!config || (config && config.debug && config.debug.showWarnings !== false)) {
                console.warn((messages.warningFactoryPreexistingInstance as () => string)());
            }
        } else {
            instance = new Mixer();

            instance.attach(el, doc, id, config);

            instances.set(id, instance);
        }

        if (config && config.debug && config.debug.enable) {
            mixerInstances.push(instance);
        } else {
            facade = createFacade(instance);
            mixerInstances.push(facade);
        }
    }

    if (returnCollection) {
        return new Collection(mixerInstances);
    }

    return mixerInstances[0];
}

// Named exports for internal use by tests and advanced consumers
export { Mixer } from './mixer';
export { Collection } from './collection';
export { messages } from './messages';
export { template } from './helpers';

export default mixitup;
