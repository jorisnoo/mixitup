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
    });
});
