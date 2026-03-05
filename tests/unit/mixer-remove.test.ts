import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#remove()', () => {
        it('should accept an element as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const toRemove = container.children[3];

            const state = await mixer.remove(toRemove);
            expect(state.show[3].id).not.toBe('target-4');
            expect(state.show[3].id).toBe('target-5');
            expect(state.totalShow).toBe(5);

            mixer.destroy();
        });

        it('should accept a collection of elements as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const toRemove = [container.children[3], container.children[0]];

            const state = await mixer.remove(toRemove);
            expect(state.show[0].id).toBe('target-2');
            expect(state.show[3].id).toBe('target-6');
            expect(state.totalShow).toBe(4);

            mixer.destroy();
        });

        it('should accept an index as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);

            const state = await mixer.remove(3);
            expect(state.show[3].id).toBe('target-5');
            expect(state.totalShow).toBe(5);

            mixer.destroy();
        });

        it('should accept a selector as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);

            const state = await mixer.remove('.category-a');
            expect(state.totalShow).toBe(3);

            mixer.destroy();
        });

        it('should allow no elements to be removed with a warning', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);

            const state = await mixer.remove();
            expect(state.totalShow).toBe(6);

            mixer.destroy();
        });

        it('should accept a callback function which is invoked after removal', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const toRemove = container.children[0];

            await new Promise<any>(resolve => mixer.insert(mixer.remove(toRemove), resolve));
            expect(toRemove).not.toBe(container);

            mixer.destroy();
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const toRemove = container.children[0];

            await mixer.remove(toRemove, false);
            expect(toRemove).not.toBe(container);

            mixer.destroy();
        });
    });
});
