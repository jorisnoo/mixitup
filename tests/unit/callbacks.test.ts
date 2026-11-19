import { describe, it, expect, vi } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup()', () => {
    it.each(['onMixEnd', 'onMixFail', 'per-call'] as const)(
        'rejects a throwing %s callback without stranding queued or subsequent mixes',
        async name => {
            const error = new Error('callback failed');
            const callback = vi.fn().mockImplementationOnce(() => { throw error; });
            const mixer = mixitup(dom.getContainer(), {
                animation: { duration: 1 },
                debug: { fauxAsync: true },
                callbacks: name === 'per-call' ? {} : { [name]: callback },
            });
            const first = name === 'per-call'
                ? mixer.filter('.missing', callback)
                : mixer.filter('.missing');
            const next = mixer.show();
            await expect(first).rejects.toBe(error);
            expect((await next).totalShow).toBe(6);
            expect(mixer.isMixing()).toBe(false);
            expect((await mixer.hide()).totalShow).toBe(0);
            mixer.destroy();
        }
    );

    it('settles an operation destroyed from its start callback without dispatching mixEnd', async () => {
        const container = dom.getContainer();
        const end = vi.fn();
        const mixer = mixitup(container, {
            callbacks: {
                onMixStart() { mixer.destroy(); },
                onMixEnd: end,
            },
        });
        await mixer.hide();
        expect(mixer.isMixing()).toBe(false);
        expect(end).not.toHaveBeenCalled();
    });

    it('should accept an `onMixStart` callback, invoked at the start of operations', async () => {
        const container = dom.getContainer();
        let wasCalled = false;

        const mixer = mixitup(container, {
            callbacks: {
                onMixStart: (state: any, futureState: any) => {
                    expect(state).toBeTruthy();
                    expect(futureState).toBeTruthy();
                    expect(state.totalShow).not.toBe(futureState.totalShow);

                    wasCalled = true;
                }
            }
        });

        await mixer.hide();
        expect(wasCalled).toBe(true);
    });

    it('should accept an `onMixBusy` callback, called if simultaneous operation is rejected', async () => {
        const container = dom.getContainer();
        let wasCalled = false;

        const mixer = mixitup(container, {
            debug: {
                fauxAsync: true
            },
            animation: {
                duration: 200,
                queue: false
            },
            callbacks: {
                onMixBusy: (state: any) => {
                    expect(state).toBeTruthy();

                    wasCalled = true;
                }
            }
        });

        mixer.hide();

        await mixer.show();
        expect(wasCalled).toBe(true);
    });

    it('should accept an `onMixEnd` callback, called at the end of an operation', async () => {
        const container = dom.getContainer();
        let wasCalled = false;
        let endState: any;

        const mixer = mixitup(container, {
            callbacks: {
                onMixEnd: (state: any) => {
                    endState = state;

                    expect(state).toBeTruthy();

                    wasCalled = true;
                }
            }
        });

        const state = await mixer.hide();
        expect(state.totalShow).toBe(endState.totalShow);
        expect(wasCalled).toBe(true);
    });

    it('should accept an `onMixFail` callback, called when a filter operation does not match any targets', async () => {
        const container = dom.getContainer();
        let wasCalled = false;

        const mixer = mixitup(container, {
            callbacks: {
                onMixFail: (state: any) => {
                    expect(state).toBeTruthy();

                    wasCalled = true;
                }
            }
        });

        await mixer.filter('.category-x');
        expect(wasCalled).toBe(true);
    });

    it('should accept an `onMixClick` callback invoked when a control is clicked', async () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const controls = dom.getFilterControls();
        let wasCalled = false;
        const filter = controls.querySelector('[data-filter="none"]') as HTMLElement;

        container.insertBefore(controls, container.children[0]);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local'
            },
            callbacks: {
                onMixClick: function(this: any, state: any, originalEvent: any) {
                    expect(state).toBeTruthy();
                    expect(originalEvent).toBeInstanceOf(window.MouseEvent);
                    expect(this).toBe(filter);

                    wasCalled = true;
                }
            }
        }, frag as any);

        filter.click();

        await Promise.resolve();
        expect(wasCalled).toBe(true);

        mixer.destroy();
    });

    it('should accept an `onMixClick` callback which can be cancelled by returning false', async () => {
        const frag = document.createDocumentFragment();
        const container = dom.getContainer();
        const controls = dom.getFilterControls();
        let wasCalled = false;
        const filter = controls.querySelector('[data-filter="none"]') as HTMLElement;

        container.insertBefore(controls, container.children[0]);

        frag.appendChild(container);

        const mixer = mixitup(container, {
            controls: {
                scope: 'local'
            },
            callbacks: {
                onMixClick: () => {
                    return false;
                },
                onMixEnd: () => {
                    wasCalled = true;
                }
            }
        }, frag as any);

        filter.click();

        await Promise.resolve();
        expect(wasCalled).toBe(false);

        mixer.destroy();
    });
});
