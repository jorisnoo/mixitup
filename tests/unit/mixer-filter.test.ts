import { describe, it, expect } from 'vitest';
import mixitup, { messages } from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#filter()', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        it('should accept a class selector', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a'));

            const state = await mixer.filter('.category-a');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept an attribute selector', async () => {
            const matching = Array.from(container.querySelectorAll('[data-category~="a"]'));

            const state = await mixer.filter('[data-category~="a"]');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept a compound OR class selector', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a, .category-b'));

            const state = await mixer.filter('.category-a, .category-b');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept a compound AND class selector', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a.category-c'));

            const state = await mixer.filter('.category-a.category-c');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept a compound OR attribute selector', async () => {
            const matching = Array.from(container.querySelectorAll('[data-category~="a"], [data-category~="c"]'));

            const state = await mixer.filter('[data-category~="a"], [data-category~="c"]');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept a compound AND attribute selector', async () => {
            const matching = Array.from(container.querySelectorAll('[data-category~="a"][data-category~="c"]'));

            const state = await mixer.filter('[data-category~="a"][data-category~="c"]');
            expect(state.totalShow).toBe(matching.length);
            expect(state.totalShow).toBe(1);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept "none"', async () => {
            const state = await mixer.filter('none');
            expect(state.totalShow).toBe(0);
            expect(state.hasFailed).toBe(false);
            expect(state.hide).toEqual(Array.from(container.children));
            expect(state.activeFilter.selector).toBe('');
        });

        it('should accept "all"', async () => {
            const state = await mixer.filter('all');
            expect(state.show).toEqual(Array.from(container.children));
            expect(state.show).toEqual(state.targets);
        });

        it('should fail if queried with a non matching selector', async () => {
            const state = await mixer.filter('.non-matching-selector');
            expect(state.show).toEqual([]);
            expect(state.hasFailed).toBe(true);
        });

        it('should accept a single element', async () => {
            const el = container.firstElementChild!;

            const state = await mixer.filter(el);
            expect(state.show).toEqual([el]);
            expect(state.activeFilter.selector).toBe('');
            expect(state.activeFilter.collection).toEqual([el]);
        });

        it('should accept a collection of elements', async () => {
            const collection = [
                container.firstElementChild!,
                container.lastElementChild!
            ];

            const state = await mixer.filter(collection);
            expect(state.show).toEqual(collection);
            expect(state.activeFilter.selector).toBe('');
            expect(state.activeFilter.collection).toEqual(collection);
        });

        it('should interpret `null` as hide all', async () => {
            const state = await mixer.filter(null);
            expect(state.show).toEqual([]);
            expect(state.activeFilter.selector).toBe('');
            expect(state.activeFilter.collection).toEqual([]);
        });

        it('should interpret `[]` as hide all', async () => {
            const state = await mixer.filter([]);
            expect(state.show).toEqual([]);
            expect(state.activeFilter.selector).toBe('');
            expect(state.activeFilter.collection).toEqual([]);
        });

        it('should accept a full CommandFilter object, allowing for inverse filtering via selector', async () => {
            const command = {
                selector: '.category-a',
                action: 'hide'
            };

            const collection = Array.from(container.querySelectorAll(':not(.category-a)'));

            const state = await mixer.filter(command);
            expect(state.show).toEqual(collection);
            expect(state.activeFilter.selector).toBe('.category-a');
            expect(state.activeFilter.action).toBe('hide');
        });

        it('should accept a full CommandFilter object, allowing for inverse filtering via a collection', async () => {
            const el = container.querySelector('.category-a.category-c')!;

            const command = {
                collection: [el],
                action: 'hide'
            };

            const collection = Array.from(container.querySelectorAll(':not(.category-a.category-c)'));

            const state = await mixer.filter(command);
            expect(state.show).toEqual(collection);
            expect(state.activeFilter.collection).toEqual([el]);
            expect(state.activeFilter.action).toBe('hide');
        });

        it('should accept a callback function which is invoked after filtering', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a'));

            const state = await new Promise<any>(resolve => mixer.filter('.category-a', resolve));

            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should return a promise which is resolved after filtering', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a'));

            const state = await mixer.filter('.category-a');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a'));

            const state = await mixer.filter('.category-a', false);
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should throw an error if both a selector and a collection are provided', () => {
            const command = {
                collection: [],
                selector: '.selector'
            };

            expect(() => {
                mixer.filter(command);
            }).toThrow((messages.errorFilterInvalidArguments as () => string)());
        });
    });
});

describe('mixitup.Mixer', () => {
    describe('#hide()', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        it('should hide all elements', async () => {
            const state = await mixer.hide();
            expect(state.totalShow).toBe(0);
            expect(state.totalHide).toBe(state.targets.length);
            expect(state.activeFilter.selector).toBe('');
        });
    });
});

describe('mixitup.Mixer', () => {
    describe('#show()', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        it('should show all elements', async () => {
            await mixer.filter('.category-a');
            const state = await mixer.show();
            expect(state.totalShow).toBe(state.targets.length);
            expect(state.totalHide).toBe(0);
            expect(state.activeFilter.selector).toBe('.mix');
        });
    });
});
