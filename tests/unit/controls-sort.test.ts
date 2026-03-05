import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('Controls', () => {
    describe('Sort', () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const controls = dom.getSortControls();

        container.insertBefore(controls, container.children[0]);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local'
            }
        }, frag as any);

        afterAll(() => mixer.destroy());

        it('should detect nested sort controls and set active states upon instantiation', () => {
            const control1 = controls.querySelector('[data-sort="default"]')!;
            const control2 = controls.querySelector('[data-sort="default:asc"]')!;

            expect(control1.matches('.mixitup-control-active')).toBeTruthy();
            expect(control2.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should handle sort control clicks with a single sortString value', () => {
            const control = controls.querySelector('[data-sort="default:desc"]') as HTMLElement;

            control.click();

            const state = mixer.getState();

            expect(control.matches('.mixitup-control-active')).toBeTruthy();
            expect(state.activeSort.sortString).toBe('default:desc');
            expect(state.activeSort.attribute).toBe('');
            expect(state.activeSort.order).toBe('desc');
        });

        it('should handle sort control clicks with "random" value', () => {
            const control = controls.querySelector('[data-sort="random"]') as HTMLElement;

            control.click();

            const state = mixer.getState();

            expect(control.matches('.mixitup-control-active')).toBeTruthy();
            expect(state.activeSort.sortString).toBe('random');
            expect(state.activeSort.attribute).toBe('');
            expect(state.activeSort.order).toBe('random');
        });

        it('should activate buttons in response to matching API calls', async () => {
            const control = controls.querySelector('[data-sort="published:asc views:desc"]')!;

            const state = await mixer.sort('published:asc views:desc');

            expect(control.matches('.mixitup-control-active')).toBeTruthy();
            expect(state.activeSort.sortString).toBe('published:asc');
            expect(state.activeSort.next).toBeTruthy();
            expect(state.activeSort.next.sortString).toBe('views:desc');
        });
    });
});
