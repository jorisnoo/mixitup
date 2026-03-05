import { describe, it, expect } from 'vitest';
import mixitup, { Mixer, Collection, messages } from '../../src/index';
import * as dom from '../mock/dom';
import dataset from '../mock/dataset.json';

describe('mixitup()', () => {
    it('should throw an error if no container reference', () => {
        expect(() => (mixitup as any)()).toThrow((messages.errorFactoryInvalidContainer as () => string)());
    });

    it('should throw an error if a null container reference is passed', () => {
        expect(() => (mixitup as any)(null)).toThrow((messages.errorFactoryInvalidContainer as () => string)());
    });

    it('should throw an error if an invalid container reference is passed', () => {
        expect(() => (mixitup as any)({})).toThrow((messages.errorFactoryInvalidContainer as () => string)());
    });

    it('should throw an error if an invalid reference or selector is passed', () => {
        expect(() => (mixitup as any)(false)).toThrow((messages.errorFactoryInvalidContainer as () => string)());
    });

    it('should throw an error if an invalid configuration option is passed', () => {
        const container = dom.getContainer();

        expect(() => {
            mixitup(container, {
                animations: {}
            } as any);
        }).toThrow(TypeError);
    });

    it('should accept an element reference as a container', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        expect(mixer).toBeTruthy();

        mixer.destroy();
    });

    it('should accept a container selector', () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();

        frag.appendChild(container);

        const mixer = mixitup('.mixitup-container', {}, frag as any);
        const state = mixer.getState();

        expect(mixer).toBeTruthy();
        expect(state.container).toBe(frag.querySelector('.mixitup-container'));

        mixer.destroy();
    });

    it('should accept a container and valid configuration object', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            selectors: {
                target: '[data-ref="mix"]'
            },
            controls: {
                enable: false
            }
        });

        const state = mixer.getState();

        expect(mixer).toBeTruthy();
        expect(state.activeFilter.selector).toBe('[data-ref="mix"]');

        mixer.destroy();
    });

    it('should throw an error if the container selector yields no element', () => {
        expect(() => mixitup('.invalid-container-selector')).toThrow((messages.errorFactoryContainerNotFound as () => string)());
    });

    it('should return a facade (frozen object) by default', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        expect(Object.isFrozen(mixer)).toBe(true);
        expect(typeof mixer.filter).toBe('function');
        expect(typeof mixer.sort).toBe('function');

        mixer.destroy();
    });

    it('should return an instance of a mixer if debug mode enabled', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            debug: {
                enable: true
            },
            controls: {
                enable: false
            }
        });

        expect(mixer).toBeInstanceOf(Mixer);

        mixer.destroy();
    });

    it('should return a single instance of a mixer, wrapping the first element if multiple elements passed', () => {
        const elementList = [
            dom.getContainer(),
            dom.getContainer()
        ];

        const mixer = mixitup(elementList, {
            debug: {
                enable: true
            },
            controls: {
                enable: false
            }
        });

        expect(mixer).toBeInstanceOf(Mixer);
        expect((mixer as any).getState().container).toBe(elementList[0]);

        mixer.destroy();
    });

    it('should return an instance of a collection if multiple elements passed and `returnCollection` specified', () => {
        const elementList = [
            dom.getContainer(),
            dom.getContainer()
        ];

        const collection = (mixitup as any)(elementList, void(0), void(0), true) as Collection;

        expect(collection).toBeInstanceOf(Collection);
        expect(Object.isFrozen(collection[0])).toBe(true);
        expect(Object.isFrozen(collection[1])).toBe(true);

        collection.mixitup('destroy');
    });

    it('should add a unique ID to the container if no ID present', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);
        const state = mixer.getState();

        expect(container.id).toBe(state.id);

        mixer.destroy();
    });

    it('should use any existing ID on the container as the mixer ID if present', () => {
        const container = dom.getContainer();
        const id = 'test-id';

        container.id = id;

        const mixer = mixitup(container);
        const state = mixer.getState();

        expect(state.id).toBe(id);

        mixer.destroy();
    });

    it('should not allow multiple instance to be instantiated on a single container', () => {
        const container = dom.getContainer();

        const mixer1 = mixitup(container, {
            debug: {
                enable: true
            },
            controls: {
                enable: false
            }
        });

        const mixer2 = mixitup(container, {
            debug: {
                enable: true,
                showWarnings: false
            },
            controls: {
                enable: false
            }
        });

        const facade = mixitup(container);

        expect(mixer1).toBe(mixer2);
        expect(facade).not.toBe(mixer1);
        expect(facade).not.toBe(mixer2);

        (mixer1 as any).destroy();
    });

    it('should respect a `load.filter` configuration option of none', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            load: {
                filter: 'none'
            }
        });

        const state = mixer.getState();

        expect(state.activeFilter.selector).toBe('');
        expect(state.totalShow).toBe(0);
        expect(state.hide[0].style.display).toBe('none');

        mixer.destroy();
    });

    it('should respect a `load.filter` configuration option of a single selector', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            load: {
                filter: '.category-a'
            }
        });

        const state = mixer.getState();

        expect(state.activeFilter.selector).toBe('.category-a');
        expect(state.totalShow).toBe(3);

        mixer.destroy();
    });

    it('should respect a `load.filter` configuration option of a compound selector', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            load: {
                filter: '.category-a.category-c'
            }
        });

        const state = mixer.getState();

        expect(state.activeFilter.selector).toBe('.category-a.category-c');
        expect(state.totalShow).toBe(1);

        mixer.destroy();
    });

    it('should respect a `load.sort` configuration option', () => {
        const idsByPublishedDate = dataset.slice().sort((a, b) => {
            if (a.published < b.published) return -1;
            if (a.published > b.published) return 1;
            return 0;
        }).map(item => item.id.toString());

        const container = dom.getContainer();
        const mixer = mixitup(container, {
            load: {
                sort: 'published'
            }
        });

        const state = mixer.getState();
        const targetIds = state.show.map((el: Element) => el.id);

        expect(targetIds).toEqual(idsByPublishedDate);

        mixer.destroy();
    });

    it('should add a `layout.containerClassName` class if specified and be reflected in state', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            layout: {
                containerClassName: 'grid'
            }
        });

        const state = mixer.getState();

        expect(state.activeContainerClassName).toBe('grid');

        mixer.destroy();
    });
});
