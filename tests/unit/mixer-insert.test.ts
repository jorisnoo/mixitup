import { describe, it, expect } from 'vitest';
import mixitup, { messages } from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#insert()', () => {
        it('should accept an element as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an element and an index as arguments', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget, 3);
            expect(state.show[3].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an html string as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget.outerHTML);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an html and an index as arguments', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget.outerHTML, 5);
            expect(state.show[5].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an element collection as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();

            newTarget2.id = '8';

            const state = await mixer.insert([newTarget1, newTarget2]);
            expect(state.show[0].id).toBe('7');
            expect(state.show[1].id).toBe('8');

            mixer.destroy();
        });

        it('should accept a document fragment as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const frag = document.createDocumentFragment();

            frag.appendChild(newTarget);

            const state = await mixer.insert(frag);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an element collection and an index as arguments', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();

            newTarget2.id = '8';

            const state = await mixer.insert([newTarget1, newTarget2], 4);
            expect(state.show[4].id).toBe('7');
            expect(state.show[5].id).toBe('8');

            mixer.destroy();
        });

        it('should throw an error if an element, index and sibling are passed simultaneously', () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const sibling = container.children[4];

            expect(() => {
                mixer.insert(newTarget, 4, sibling);
            }).toThrow((messages.errorInsertInvalidArguments as () => string)());
        });

        it('should accept an element and sibling reference to insert before', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const sibling = container.children[4];

            const state = await mixer.insert(newTarget, sibling);
            expect(state.show[4].id).toBe('7');

            mixer.destroy();
        });

        it('should accept an element, sibling reference and position string', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const sibling = container.children[4];

            const state = await mixer.insert(newTarget, sibling, 'after');
            expect(state.show[5].id).toBe('7');

            mixer.destroy();
        });

        it('should insert at end if the insertion index is above range', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget, 10);
            expect(state.show[6].id).toBe('7');

            mixer.destroy();
        });

        it('should insert at start if the insertion index is below range', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.insert(newTarget, -2);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });

        it('should throw an error if the element to insert already exists', () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = container.children[1];

            expect(() => {
                mixer.insert(newTarget);
            }).toThrow((messages.errorInsertPreexistingElement as () => string)());
        });

        it('should allow no elements to be inserted with a warning', async () => {
            const container = dom.getContainer();
            const totalTargets = container.children.length;
            const mixer = mixitup(container);

            const state = await mixer.insert();
            expect(state.totalShow).toBe(totalTargets);

            mixer.destroy();
        });

        it('should accept a callback function which is invoked after insertion', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            await new Promise<any>(resolve => mixer.insert(newTarget, resolve));
            expect(newTarget.parentElement).toBe(container);

            mixer.destroy();
        });

        it('should accept a boolean allowing toggling off of animation', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            await mixer.insert(newTarget, false);
            expect(newTarget.parentElement).toBe(container);

            mixer.destroy();
        });

        it('should accept a HTML with padding whitespace as an argument', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = ' ' + dom.getTarget().outerHTML + ' ';

            const state = await mixer.insert(newTarget);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });
    });

    describe('#prepend()', () => {
        it('should insert an element at the start', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.prepend(newTarget);
            expect(state.show[0].id).toBe('7');

            mixer.destroy();
        });

        it('should insert a collection of elements at the start', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();

            newTarget2.id = '8';

            const state = await mixer.prepend([newTarget1, newTarget2]);
            expect(state.show[0].id).toBe('7');
            expect(state.show[1].id).toBe('8');

            mixer.destroy();
        });
    });

    describe('#append()', () => {
        it('should insert an element at the end', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();

            const state = await mixer.append(newTarget);
            expect(state.show[6].id).toBe('7');

            mixer.destroy();
        });

        it('should insert a collection of elements at the end', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();

            newTarget2.id = '8';

            const state = await mixer.append([newTarget1, newTarget2]);
            expect(state.show[6].id).toBe('7');
            expect(state.show[7].id).toBe('8');

            mixer.destroy();
        });

        it('should accept a document fragment as an argument to append', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const frag = document.createDocumentFragment();

            frag.appendChild(newTarget);

            const state = await mixer.append(frag);
            expect(state.show[6].id).toBe('7');

            mixer.destroy();
        });
    });

    describe('#insertBefore()', () => {
        it('should insert an element before the referenced element', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const sibling = container.children[3];

            const state = await mixer.insertBefore(newTarget, sibling);
            expect(state.show[3].id).toBe('7');

            mixer.destroy();
        });

        it('should insert a collection of elements before the referenced element', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();
            const sibling = container.children[3];

            newTarget2.id = '8';

            const state = await mixer.insertBefore([newTarget1, newTarget2], sibling);
            expect(state.show[3].id).toBe('7');
            expect(state.show[4].id).toBe('8');

            mixer.destroy();
        });
    });

    describe('#insertAfter()', () => {
        it('should insert an element after the referenced element', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget = dom.getTarget();
            const sibling = container.children[3];

            const state = await mixer.insertAfter(newTarget, sibling);
            expect(state.show[4].id).toBe('7');

            mixer.destroy();
        });

        it('should insert a collection of elements after the referenced element', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container);
            const newTarget1 = dom.getTarget();
            const newTarget2 = dom.getTarget();
            const sibling = container.children[3];

            newTarget2.id = '8';

            const state = await mixer.insertAfter([newTarget1, newTarget2], sibling);
            expect(state.show[4].id).toBe('7');
            expect(state.show[5].id).toBe('8');

            mixer.destroy();
        });
    });
});
