import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    const container = dom.getContainer();
    const newClass = 'mixitup-container__display-rows';
    const mixer = mixitup(container);

    describe('#changeLayout()', () => {
        it('should add a new class name to the container', async () => {
            const state = await mixer.changeLayout(newClass);
            expect(state.activeContainerClassName).toBe(newClass);
            expect(container.matches('.' + newClass)).toBeTruthy();
        });

        it('should remove the class name from the container', async () => {
            const state = await mixer.changeLayout('');
            expect(state.activeContainerClassName).toBe('');
            expect(container.matches('.' + newClass)).toBeFalsy();
        });

        it('should accept a callback function which is invoked after filtering', async () => {
            const state = await new Promise<any>(resolve => mixer.changeLayout(newClass, resolve));
            expect(state.activeContainerClassName).toBe(newClass);
            expect(container.matches('.' + newClass)).toBeTruthy();
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            const state = await mixer.changeLayout('', false);
            expect(state.activeContainerClassName).toBe('');
            expect(container.matches('.' + newClass)).toBeFalsy();
        });
    });
});
