import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('Controls', () => {
    describe('Toggle', () => {
        describe('OR', () => {
            const frag = document.createDocumentFragment();
            const container = dom.getContainer();
            const controls = dom.getFilterControls();

            container.insertBefore(controls, container.children[0]);

            frag.appendChild(container);

            const mixer = mixitup(container, {
                controls: {
                    scope: 'local'
                }
            });

            afterAll(() => mixer.destroy());

            it('should accept toggle controls with a selector value', async () => {
                await mixer.hide();

                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-a').length;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-a');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggle.matches('.mixitup-control-active')).toBeTruthy();
            });

            it('should build up a compound selector as toggles are activated', () => {
                const toggleA = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const toggleB = controls.querySelector('[data-toggle=".category-b"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-a, .category-b').length;

                toggleB.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-a, .category-b');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggleA.matches('.mixitup-control-active')).toBeTruthy();
                expect(toggleB.matches('.mixitup-control-active')).toBeTruthy();
            });

            it('should break down a compound selector as toggles are deactivated', () => {
                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-b').length;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-b');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();
            });

            it('should return to "all" when all toggles are deactivated', () => {
                const toggle = controls.querySelector('[data-toggle=".category-b"]') as HTMLElement;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.mix');
                expect(state.totalHide).toBe(0);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();
            });

            it('should activate the appropriate toggle controls on load for an OR compound selector', () => {
                const frag = document.createDocumentFragment();
                const container = dom.getContainer();
                const controls = dom.getFilterControls();

                frag.appendChild(controls);
                frag.appendChild(container);

                const mixer = mixitup(container, {
                    load: {
                        filter: '.category-a, .category-c'
                    }
                }, frag as any);

                const toggleA = controls.querySelector('[data-toggle=".category-a"]')!;
                const toggleC = controls.querySelector('[data-toggle=".category-c"]')!;

                expect(toggleA.classList.contains('mixitup-control-active')).toBe(true);
                expect(toggleC.classList.contains('mixitup-control-active')).toBe(true);

                mixer.destroy();
            });
        });

        describe('AND', () => {
            const frag = document.createDocumentFragment();
            const container = dom.getContainer();
            const controls = dom.getFilterControls();

            container.insertBefore(controls, container.children[0]);

            frag.appendChild(container);

            const mixer = mixitup(container, {
                controls: {
                    scope: 'local',
                    toggleLogic: 'AND'
                }
            });

            afterAll(() => mixer.destroy());

            it('should accept toggle controls with a selector value', async () => {
                await mixer.hide();

                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-a').length;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-a');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggle.matches('.mixitup-control-active')).toBeTruthy();
            });

            it('should build up a compound selector as toggles are activated', () => {
                const toggleA = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const toggleC = controls.querySelector('[data-toggle=".category-c"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-a.category-c').length;

                toggleC.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-a.category-c');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggleA.matches('.mixitup-control-active')).toBeTruthy();
                expect(toggleC.matches('.mixitup-control-active')).toBeTruthy();
            });

            it('should break down a compound selector as toggles are deactivated', () => {
                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;
                const totalMatching = container.querySelectorAll('.category-c').length;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-c');
                expect(state.totalShow).toBe(totalMatching);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();
            });

            it('should return to "all" when all toggles are deactivated', () => {
                const toggle = controls.querySelector('[data-toggle=".category-c"]') as HTMLElement;

                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.mix');
                expect(state.totalHide).toBe(0);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();
            });

            it('should allow toggles to be activated via the API', () => {
                const totalMatching = container.querySelectorAll('.category-a.category-c').length;

                mixer.toggleOn('.category-a');
                mixer.toggleOn('.category-c');

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.category-a.category-c');
                expect(state.totalShow).toBe(totalMatching);
            });

            it('should activate the appropriate toggle controls on load for an AND compound selector', () => {
                const frag = document.createDocumentFragment();
                const container = dom.getContainer();
                const controls = dom.getFilterControls();

                frag.appendChild(controls);
                frag.appendChild(container);

                const mixer = mixitup(container, {
                    controls: {
                        toggleLogic: 'and'
                    },
                    load: {
                        filter: '.category-a.category-c'
                    }
                }, frag as any);

                const toggleA = controls.querySelector('[data-toggle=".category-a"]')!;
                const toggleC = controls.querySelector('[data-toggle=".category-c"]')!;

                expect(toggleA.classList.contains('mixitup-control-active')).toBe(true);
                expect(toggleC.classList.contains('mixitup-control-active')).toBe(true);

                mixer.destroy();
            });
        });

        describe('Defaults', () => {
            it('should default to "none" when all toggles are deactivated and toggleDefault is set to "none"', async () => {
                const frag = document.createDocumentFragment();
                const container = dom.getContainer();
                const controls = dom.getFilterControls();

                container.insertBefore(controls, container.children[0]);

                frag.appendChild(container);

                const mixer = mixitup(container, {
                    controls: {
                        scope: 'local',
                        toggleDefault: 'none'
                    }
                });

                await mixer.hide();

                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;

                // on
                toggle.click();
                // off
                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('');
                expect(state.totalShow).toBe(0);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();

                mixer.destroy();
            });

            it('should default to "all" when all toggles are deactivated', async () => {
                const container = dom.getContainer();
                const controls = dom.getFilterControls();

                container.insertBefore(controls, container.children[0]);

                document.body.appendChild(container);

                const mixer = mixitup(container, {
                    controls: {
                        scope: 'local',
                        toggleDefault: 'all'
                    }
                });

                await mixer.hide();

                const toggle = controls.querySelector('[data-toggle=".category-a"]') as HTMLElement;

                // on
                toggle.click();
                // off
                toggle.click();

                const state = mixer.getState();

                expect(state.activeFilter.selector).toBe('.mix');
                expect(state.totalHide).toBe(0);
                expect(toggle.matches('.mixitup-control-active')).toBeFalsy();
            });
        });
    });
});
