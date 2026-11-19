import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#multimix()', () => {
        it('should accept a multimix command object', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);

            const state = await mixer.multimix({
                filter: '.category-a'
            });

            expect(state.activeFilter.selector).toBe('.category-a');

            mixer.destroy();
        });

        it('normalizes filter elements and sort collections like the standalone methods', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const targets = mixer.getState().targets.slice().reverse();
            const state = await mixer.multimix({ filter: targets[1], sort: targets }, false);
            expect(state.show).toEqual([targets[1]]);
            expect(state.targets).toEqual(targets);
            const selected = targets.slice(1, 4);
            expect((await mixer.multimix({ filter: selected })).show).toEqual(selected);
            mixer.destroy();
        });
    });
});
