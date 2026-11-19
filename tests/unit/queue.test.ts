import { describe, it, expect, afterEach, vi } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';
import JSONDataset from '../mock/dataset.json';

afterEach(() => { vi.restoreAllMocks(); });

describe('mixitup.Mixer', () => {
    describe('Queue', () => {
        it('should warn if too many multimix operations are pushed into the queue', async () => {
            const container = dom.getContainer();
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const busy = vi.fn();
            const mixer = mixitup(container, {
                callbacks: { onMixBusy: busy },
                debug: {
                    fauxAsync: true
                },
                animation: {
                    duration: 1
                }
            });

            const states = await Promise.all([
                mixer.hide(),
                mixer.show(),
                mixer.hide(),
                mixer.show(),
                mixer.hide()
            ]);

            expect(states.map(state => state.totalShow)).toEqual([0, 6, 0, 6, 6]);
            expect(busy).toHaveBeenCalledTimes(1);
            expect(warn).toHaveBeenCalledTimes(1);
            expect(mixer.isMixing()).toBe(false);
            mixer.destroy();
        });

        it('should warn if too many dataset operations are pushed into the queue', async () => {
            const container = dom.getContainer();
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const busy = vi.fn();

            const mixer = mixitup(container, {
                callbacks: { onMixBusy: busy },
                debug: {
                    fauxAsync: true
                },
                animation: {
                    duration: 1
                },
                data: {
                    uidKey: 'id'
                },
                load: {
                    dataset: JSONDataset
                }
            });

            const states = await Promise.all([
                mixer.dataset([]),
                mixer.dataset(JSONDataset),
                mixer.dataset([]),
                mixer.dataset(JSONDataset),
                mixer.dataset([])
            ]);

            expect(states.map(state => state.totalShow)).toEqual([0, 6, 0, 6, 6]);
            expect(busy).toHaveBeenCalledTimes(1);
            expect(warn).toHaveBeenCalledTimes(1);
            expect(mixer.isMixing()).toBe(false);
            mixer.destroy();
        });

        it('keeps the clicked button on each queued operation, but not on an API call', async () => {
            const container = dom.getContainer();
            const controls = dom.getFilterControls();
            container.prepend(controls);
            const first = controls.querySelector<HTMLElement>('[data-filter=".category-a"]')!;
            const second = controls.querySelector<HTMLElement>('[data-toggle=".category-b"]')!;
            const clicked: Element[] = [];
            const events: Element[] = [];
            const completed: (Element | null)[] = [];
            container.addEventListener('mixClick', event => events.push((event as CustomEvent).detail.control));
            const mixer = mixitup(container, {
                animation: { duration: 1 },
                debug: { fauxAsync: true },
                controls: { live: true, scope: 'local' },
                callbacks: {
                    onMixClick() { clicked.push(this); },
                    onMixEnd(state) { completed.push(state.triggerElement); },
                },
            });

            first.click();
            second.click();
            const final = await mixer.show();
            expect(clicked).toEqual([first, second]);
            expect(events).toEqual([first, second]);
            expect(completed).toEqual([first, second, null]);
            expect(final.triggerElement).toBeNull();
            mixer.destroy();
        });
    });
});
