import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('Controls', () => {
    describe('Filter', () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const controls = dom.getFilterControls();

        container.insertBefore(controls, container.children[0]);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local'
            }
        }, frag as any);

        afterAll(() => mixer.destroy());

        it('should detect nested filter controls and set active states upon instantiation', () => {
            const filter = controls.querySelector('[data-filter="all"]')!;

            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should map filter controls with value "none" to the selector ""', () => {
            const filter = controls.querySelector('[data-filter="none"]') as HTMLElement;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('');
            expect(state.totalShow).toBe(0);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should map filter controls with value "all" to the target selector', () => {
            const filter = controls.querySelector('[data-filter="all"]') as HTMLElement;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.mix');
            expect(state.totalHide).toBe(0);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with a selector value', () => {
            const filter = controls.querySelector('[data-filter=".category-a"]') as HTMLElement;
            const totalMatching = container.querySelectorAll('.category-a').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-a');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with a compound OR selector', () => {
            const filter = controls.querySelector('[data-filter=".category-a, .category-b"]') as HTMLElement;
            const totalMatching = container.querySelectorAll('.category-a, .category-b').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-a, .category-b');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with a compound AND selector', () => {
            const filter = controls.querySelector('[data-filter=".category-a.category-c"]') as HTMLElement;
            const totalMatching = container.querySelectorAll('.category-a.category-c').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-a.category-c');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with an attribute selector value', () => {
            const filter = controls.querySelector('.mixitup_control__attr-a') as HTMLElement;
            const totalMatching = container.querySelectorAll('[data-category="a"]').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('[data-category="a"]');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with a compound OR attribute selector value', () => {
            const filter = controls.querySelector('.mixitup_control__attr-a-or-b') as HTMLElement;
            const totalMatching = container.querySelectorAll('[data-category="a"], [data-category="b"]').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('[data-category="a"], [data-category="b"]');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should accept filter controls with a compound AND attribute selector value', () => {
            const filter = controls.querySelector('.mixitup_control__attr-a-and-c') as HTMLElement;
            const totalMatching = container.querySelectorAll('[data-category="a"][data-category="c"]').length;

            filter.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('[data-category="a"][data-category="c"]');
            expect(state.totalShow).toBe(totalMatching);
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should allow a single set of controls to control multiple mixer instances simultaneously', () => {
            const frag = document.createDocumentFragment();

            const container1 = dom.getContainer();
            const container2 = dom.getContainer();
            const controls = dom.getFilterControls();

            frag.appendChild(controls);
            frag.appendChild(container1);
            frag.appendChild(container2);

            const mixer1 = mixitup(container1, {}, frag as any);
            const mixer2 = mixitup(container2, {}, frag as any);

            const filter = controls.querySelector('[data-filter=".category-a"]') as HTMLElement;

            filter.click();

            expect(mixer1.getState().activeFilter.selector).toBe('.category-a');
            expect(mixer2.getState().activeFilter.selector).toBe('.category-a');
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();

            mixer1.destroy();
            mixer2.destroy();
        });

        it('should activate the appropriate controls on load for a single selector', () => {
            const frag = document.createDocumentFragment();

            const container = dom.getContainer();
            const controls = dom.getFilterControls();

            frag.appendChild(controls);
            frag.appendChild(container);

            const mixer = mixitup(container, {
                load: {
                    filter: '.category-a'
                }
            }, frag as any);

            const filter = controls.querySelector('[data-filter=".category-a"]')!;

            expect(filter.classList.contains('mixitup-control-active')).toBe(true);

            mixer.destroy();
        });
    });
});
