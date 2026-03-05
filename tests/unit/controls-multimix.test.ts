import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('Controls', () => {
    describe('Multimix', () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const controls = dom.getMultimixControls();

        container.insertBefore(controls, container.children[0]);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local'
            }
        }, frag as any);

        afterAll(() => mixer.destroy());

        it('should detect nested filter controls and set active states upon instantiation', () => {
            const control = controls.querySelector('[data-filter="all"][data-sort="default:asc"]')!;

            expect(control.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should read filter and sort actions simultaneously', () => {
            const control = controls.querySelector('[data-filter=".category-b"][data-sort="published"]') as HTMLElement;

            control.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-b');
            expect(state.activeSort.sortString).toBe('published');

            expect(control.matches('.mixitup-control-active')).toBeTruthy();
        });
    });
});
