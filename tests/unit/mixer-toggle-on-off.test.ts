import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#toggleOn()', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container);

        it('should activate an initial toggle', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a'));

            const state = await mixer.toggleOn('.category-a');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should activate a further toggle', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a, .category-c'));

            const state = await mixer.toggleOn('.category-c');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should activate a non-existent toggle with no effect', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a, .category-c'));

            const state = await mixer.toggleOn('.category-z');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });
    });

    describe('#toggleOff()', () => {
        const container = dom.getContainer();
        const mixer = mixitup(container, {
            load: {
                filter: '.category-a, .category-b, .category-c'
            }
        });

        it('should deactivate a toggle', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a, .category-b'));

            const state = await mixer.toggleOff('.category-c');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });

        it('should deactivate a non existent toggle with no effect', async () => {
            const matching = Array.from(container.querySelectorAll('.category-a, .category-b'));

            const state = await mixer.toggleOff('.category-z');
            expect(state.totalShow).toBe(matching.length);
            expect(state.show).toEqual(matching);
            expect(state.matching).toEqual(matching);
        });
    });
});
