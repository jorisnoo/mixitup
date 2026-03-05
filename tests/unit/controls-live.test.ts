import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('Controls', () => {
    describe('Live', () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const filterControls = dom.getFilterControls();
        const sortControls = dom.getSortControls();

        container.insertBefore(filterControls, container.children[0]);
        container.insertBefore(sortControls, filterControls);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local',
                live: true
            }
        }, frag as any);

        afterAll(() => mixer.destroy());

        it('should detect nested controls and set active states upon instantiation', () => {
            const filter = filterControls.querySelector('[data-filter="all"]')!;

            expect(filter.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should allow new filter controls to be added', () => {
            const control = dom.getFilterControl();
            const totalMatching = container.querySelectorAll('.category-d').length;

            filterControls.appendChild(control);

            control.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-d');
            expect(state.totalShow).toBe(totalMatching);
            expect(control.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should allow new toggle controls to be added', () => {
            const control = dom.getToggleControl();
            const totalMatching = container.querySelectorAll('.category-b, .category-d').length;

            filterControls.appendChild(control);

            control.click();

            const state = mixer.getState();

            expect(state.activeFilter.selector).toBe('.category-d, .category-b');
            expect(state.totalShow).toBe(totalMatching);
            expect(control.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should allow new sort controls to be added', () => {
            const control = dom.getSortControl();

            sortControls.appendChild(control);

            control.click();

            const state = mixer.getState();

            expect(state.activeSort.sortString).toBe('views:desc');
            expect(state.activeSort.next).toBeTruthy();
            expect(state.activeSort.next.sortString).toBe('published:asc');
            expect(control.matches('.mixitup-control-active')).toBeTruthy();
        });

        it('should allow a single set of filter controls to control multiple mixer instances simultaneously', () => {
            const frag = document.createDocumentFragment();

            const container1 = dom.getContainer();
            const container2 = dom.getContainer();
            const controls = dom.getFilterControls();
            const config = {
                controls: {
                    live: true
                }
            };

            frag.appendChild(controls);
            frag.appendChild(container1);
            frag.appendChild(container2);

            const mixer1 = mixitup(container1, config, frag as any);
            const mixer2 = mixitup(container2, config, frag as any);

            const filter = controls.querySelector('[data-filter=".category-a"]') as HTMLElement;

            filter.click();

            expect(mixer1.getState().activeFilter.selector).toBe('.category-a');
            expect(mixer2.getState().activeFilter.selector).toBe('.category-a');
            expect(filter.matches('.mixitup-control-active')).toBeTruthy();

            mixer1.destroy();
            mixer2.destroy();
        });

        it('should restrict control clicks to only those matching a control selector if defined', () => {
            const frag = document.createDocumentFragment();

            const container = dom.getContainer();
            const controls = dom.getFilterControls();

            const config = {
                controls: {
                    live: true
                },
                selectors: {
                    control: '.mixitup-control-restrict'
                }
            };

            frag.appendChild(controls);
            frag.appendChild(container);

            const mixer = mixitup(container, config, frag as any);

            const filter1 = controls.querySelector('[data-filter=".category-a"]') as HTMLElement;

            filter1.classList.add('mixitup-control-restrict');

            filter1.click();

            const filter2 = controls.querySelector('[data-filter=".category-b"]') as HTMLElement;

            filter2.click();

            expect(mixer.getState().activeFilter.selector).toBe('.category-a');
            expect(filter1.matches('.mixitup-control-active')).toBeTruthy();
            expect(filter2.matches('.mixitup-control-active')).toBeFalsy();

            mixer.destroy();
        });
    });
});
