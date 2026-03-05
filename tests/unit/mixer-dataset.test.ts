import { describe, it, expect, afterAll } from 'vitest';
import mixitup, { messages, template } from '../../src/index';
import * as dom from '../mock/dom';
import JSONDataset from '../mock/dataset.json';

const dataset = JSONDataset.map(data => new dom.Item(data));

describe('mixitup()', () => {
    it('should throw an error if `load.dataset` does not match pre-rendered targets', () => {
        const emptyContainer = dom.getEmptyContainer();

        expect(() => {
            mixitup(emptyContainer, {
                load: {
                    dataset: dataset
                }
            } as any);
        }).toThrow((messages.errorDatasetPrerenderedMismatch as () => string)());
    });

    it('should throw an error if UID not provided in dataset API mode', () => {
        const container = dom.getContainer();

        expect(() => {
            mixitup(container, {
                load: {
                    dataset: dataset
                }
            } as any);
        }).toThrow((messages.errorConfigDataUidKeyNotSet as () => string)());
    });

    it('should instantiate in dataset API mode when provided with `load.dataset` and a matching container', () => {
        const container = dom.getContainer();
        const targets = Array.from(container.children);

        const mixer = mixitup(container, {
            data: {
                uidKey: 'id'
            },
            load: {
                dataset: dataset
            }
        } as any);

        const state = mixer.getState();

        expect(state.activeFilter).toBe(null);
        expect(state.activeSort).toBe(null);
        expect(state.activeDataset).toEqual(dataset);
        expect(state.targets).toEqual(targets);
        expect(state.show).toEqual(targets);
        expect(state.matching).toEqual([]);

        mixer.destroy();
    });
});

describe('mixitup.Mixer', () => {
    describe('#dataset()', () => {
        const container = dom.getContainer();
        const workingDataset = dataset.slice();
        const config = {
            data: {
                uidKey: 'id',
                dirtyCheck: true
            },
            render: {
                target: template(dom.ITEM_TEMPLATE)
            },
            load: {
                dataset: dataset
            }
        };

        const mixer = mixitup(container, config as any);

        const startTotalWhitespace = dom.getTotalWhitespace(container.outerHTML);

        afterAll(() => mixer.destroy());

        it('should throw an error if an item is added to the dataset, without a render function defined', () => {
            const newDataset = dataset.slice();
            const container = dom.getContainer();
            const erMixer = mixitup(container, {
                data: {
                    uidKey: 'id'
                },
                load: {
                    dataset: dataset
                }
            } as any);

            newDataset.push(new dom.Item({
                id: 99,
                categories: ['d']
            }));

            expect(() => {
                erMixer.dataset(newDataset);
            }).toThrow((messages.errorDatasetRendererNotSet as () => string)());
        });

        it('should throw an error if an item is added to the dataset without a valid UID', () => {
            const newDataset = dataset.slice();
            const container = dom.getContainer();

            const erMixer = mixitup(container, config as any);

            newDataset.push(new dom.Item({
                categories: ['d']
            }));

            expect(() => {
                erMixer.dataset(newDataset);
            }).toThrow((messages.errorDatasetInvalidUidKey as (data: any) => string)({
                uidKey: 'id'
            }));
        });

        it('should throw an error if an item with a duplicate UID is added to the dataset', () => {
            const newDataset = dataset.slice();
            const container = dom.getContainer();

            const erMixer = mixitup(container, config as any);

            newDataset.push(new dom.Item({
                id: 'target-1',
                categories: ['d']
            }));

            expect(() => {
                erMixer.dataset(newDataset);
            }).toThrow((messages.errorDatasetDuplicateUid as (data: any) => string)({
                uid: 'target-1'
            }));
        });

        it('should insert a target when a new item is added to end of the dataset', async () => {
            workingDataset.push(new dom.Item({
                id: 7,
                categories: ['d']
            }));

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(7);
            expect(state.show[6].id).toBe('7');
            expect(state.show[6].matches('.category-d')).toBeTruthy();
        });

        it('should insert a target when a new item is added to the start of the dataset', async () => {
            workingDataset.unshift(new dom.Item({
                id: 0,
                categories: ['d']
            }));

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(8);
            expect(state.show[0].id).toBe('0');
            expect(state.show[0].matches('.category-d')).toBeTruthy();
        });

        it('should insert a target when a new item is added at an arbitrary point in the dataset', async () => {
            workingDataset.splice(3, 0, new dom.Item({
                id: 999,
                categories: ['d']
            }));

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(9);
            expect(state.show[3].id).toBe('999');
            expect(state.show[3].matches('.category-d')).toBeTruthy();
        });

        it('should remove a target when an item is removed from the end of the dataset', async () => {
            workingDataset.pop();

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(8);
            expect(state.show[7].id).not.toBe('7');
        });

        it('should remove a target when an item is removed from the start of the dataset', async () => {
            workingDataset.shift();

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(7);
            expect(state.show[0].id).not.toBe('0');
        });

        it('should remove a target when an item is removed from an arbitrary point in the dataset', async () => {
            const removed = workingDataset.splice(2, 1);

            expect(removed[0].id).toBe(999);

            const state = await mixer.dataset(workingDataset);
            expect(state.totalShow).toBe(6);
            expect(state.show[2].id).not.toBe('999');
        });

        it('should sort targets when the dataset is sorted', async () => {
            workingDataset.reverse();

            const ids = workingDataset.map((item) => item.id.toString());

            const state = await mixer.dataset(workingDataset);
            const elIds = state.show.map((el: Element) => el.id);

            expect(state.totalShow).toBe(6);
            expect(elIds).toEqual(ids);
        });

        it('should rerender targets if their data changes and dirtyChecking is enabled', async () => {
            workingDataset[0] = new dom.Item(Object.assign({}, workingDataset[0]));
            workingDataset[0].categories.push('z');

            const state = await mixer.dataset(workingDataset);
            expect(state.show[0].matches('.category-z')).toBeTruthy();
        });

        it('should not insert excessive whitespace after DOM manipulations', () => {
            expect(dom.getTotalWhitespace(container.outerHTML)).toBe(startTotalWhitespace);
        });

        it('should accept a callback function which is invoked after dataset change', async () => {
            workingDataset.reverse();

            const ids = workingDataset.map((item) => item.id.toString());

            const state = await new Promise<any>(resolve => mixer.dataset(workingDataset, resolve));
            const elIds = state.show.map((el: Element) => el.id);

            expect(state.totalShow).toBe(6);
            expect(elIds).toEqual(ids);
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            workingDataset.reverse();

            const ids = workingDataset.map((item) => item.id.toString());

            const state = await mixer.dataset(workingDataset, false);
            const elIds = state.show.map((el: Element) => el.id);

            expect(state.totalShow).toBe(6);
            expect(elIds).toEqual(ids);
        });

        it('should re-render targets reflective of template changes when `forceRender` is called', () => {
            let firstTarget = mixer.getState().show[0];

            expect(firstTarget.outerHTML).toBe('<div id="target-6" class="mix category-a category-c category-z" data-ref="mix" data-category="a c z" data-published="20151020" data-views="95"></div>');

            mixer.configure({
                render: {
                    target: template(dom.ITEM_TEMPLATE_ALT)
                }
            } as any);

            mixer.forceRender();

            firstTarget = mixer.getState().show[0];

            expect(firstTarget.outerHTML).toBe('<div id="target-6"></div>');
        });
    });
});
