import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';
import dataset from '../mock/dataset.json';

describe('mixitup.Mixer', () => {
    describe('#sort()', () => {
        const container = dom.getContainer();
        const originalOrder = Array.from(container.children);
        const mixer = mixitup(container);

        const idsByPublishedDate = dataset.slice().sort((a, b) => {
            if (a.published < b.published) return -1;
            if (a.published > b.published) return 1;
            return 0;
        }).map(item => item.id.toString());

        const idsByViewsThenPublishedDate = dataset.slice().sort((a, b) => {
            if (a.views < b.views) return -1;
            if (a.views > b.views) return 1;

            if (a.published < b.published) return -1;
            if (a.published > b.published) return 1;

            return 0;
        }).map(item => item.id.toString());

        afterAll(() => mixer.destroy());

        it('accepts `default` as a sort string, but should have no effect on the order', async () => {
            const startOrder = mixer.getState().show;

            const state = await mixer.sort('default');
            expect(state.show).toEqual(startOrder);
            expect(state.activeSort.sortString).toBe('default');
            expect(state.activeSort.order).toBe('asc');
            expect(state.activeSort.attribute).toBe('');
        });

        it('accepts `default:asc` as a sort string, but should have no effect on the order', async () => {
            const startOrder = mixer.getState().show;

            const state = await mixer.sort('default:asc');
            expect(state.show).toEqual(startOrder);
            expect(state.activeSort.sortString).toBe('default:asc');
            expect(state.activeSort.order).toBe('asc');
            expect(state.activeSort.attribute).toBe('');
        });

        it('accepts `default:desc` as a sort string, which should reverse the order', async () => {
            const reversedOrder = mixer.getState().show.slice().reverse();

            const state = await mixer.sort('default:desc');
            expect(state.show).toEqual(reversedOrder);
            expect(state.activeSort.sortString).toBe('default:desc');
            expect(state.activeSort.order).toBe('desc');
            expect(state.activeSort.attribute).toBe('');
        });

        it('should return the mixer to its original order if sorted by `default` after previous transformations', async () => {
            const state = await mixer.sort('default');
            expect(state.show).toEqual(originalOrder);
        });

        it('should accept `random` as a sort string, shuffling the targets', async () => {
            const state = await mixer.sort('random');
            // Random may occasionally match, so just check sort string
            expect(state.activeSort.sortString).toBe('random');
            expect(state.activeSort.order).toBe('random');
            expect(state.activeSort.attribute).toBe('');
        });

        it('should accept a data-attribute as a sort string, sorting by the attribute\'s value', async () => {
            const state = await mixer.sort('published');
            const targetIds = state.show.map((el: Element) => el.id);

            expect(state.activeSort.sortString).toBe('published');
            expect(state.activeSort.order).toBe('asc');
            expect(state.activeSort.attribute).toBe('published');
            expect(targetIds).toEqual(idsByPublishedDate);
        });

        it('should accept a data-attribute and an order, sorting by the attribute\'s value in the defined order', async () => {
            const idsByPublishedDateDesc = idsByPublishedDate.slice().reverse();

            const state = await mixer.sort('published:desc');
            const targetIds = state.show.map((el: Element) => el.id);

            expect(state.activeSort.sortString).toBe('published:desc');
            expect(state.activeSort.order).toBe('desc');
            expect(state.activeSort.attribute).toBe('published');
            expect(targetIds).toEqual(idsByPublishedDateDesc);
        });

        it('should accept multiple sort strings for multi attribute sorting', async () => {
            const state = await mixer.sort('views published');
            const targetIds = state.show.map((el: Element) => el.id);

            expect(state.activeSort.next).toBeTruthy();
            expect(state.activeSort.sortString).toBe('views');
            expect(state.activeSort.order).toBe('asc');
            expect(state.activeSort.attribute).toBe('views');
            expect(state.activeSort.next.sortString).toBe('published');
            expect(state.activeSort.next.order).toBe('asc');
            expect(state.activeSort.next.attribute).toBe('published');
            expect(targetIds).toEqual(idsByViewsThenPublishedDate);
        });

        it('should accept multiple sort strings with orders for multi attribute sorting', async () => {
            const idsByViewsThenPublishedDateDesc = idsByViewsThenPublishedDate.slice().reverse();

            const state = await mixer.sort('views:desc published:desc');
            const targetIds = state.show.map((el: Element) => el.id);

            expect(targetIds).toEqual(idsByViewsThenPublishedDateDesc);
        });

        it('should accept a collection of elements by which to sort by', async () => {
            const firstTarget = mixer.getState().targets[0];
            const collection = mixer.getState().targets.slice().reverse();

            const state = await mixer.sort(collection);
            const lastTarget = state.targets[state.targets.length - 1];

            expect(lastTarget).toEqual(firstTarget);
        });

        it('should error if any element in the collection provided does not exist in the container', () => {
            const collection = [document.createElement('div')];

            expect(() => mixer.sort(collection)).toThrow();
        });

        it('should accept a callback function which is invoked after sorting', async () => {
            const state = await new Promise<any>(resolve => mixer.sort('random', resolve));

            expect(state.activeSort.sortString).toBe('random');
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            const state = await mixer.sort('random', false);
            expect(state.activeSort.sortString).toBe('random');
        });

        it('should resort when sorting attributes are dynamically edited, if `behavior.liveSort` is enabled', async () => {
            const newDate = '20170628';

            let state = await mixer.sort('published', false);
            const startOrder = state.targets;

            const target4 = container.querySelector('#target-4')!;
            target4.setAttribute('data-published', newDate);

            state = await mixer.sort('published', false);
            // Order has not changed
            expect(state.targets).toEqual(startOrder);
            expect(state.targets[5].getAttribute('data-published')).not.toBe(newDate);

            mixer.configure({
                behavior: {
                    liveSort: true
                }
            });

            state = await mixer.sort('published', false);
            // Order has changed
            expect(state.targets).not.toEqual(startOrder);
            expect(state.targets[5].getAttribute('data-published')).toBe(newDate);
        });
    });
});
