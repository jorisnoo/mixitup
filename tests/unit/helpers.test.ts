import { describe, expect, it, vi } from 'vitest';
import mixitup from '../../src/index';
import { deepEquals, extend, getDocumentState, isVisible } from '../../src/helpers';

describe('configuration and dataset helpers', () => {
    it('merges own settings only and leaves other defaults intact', () => {
        const options = Object.create({ duration: 1 });
        options.enable = false;
        const animation = { duration: 300, enable: true };

        extend(animation, options, true);

        expect(animation).toEqual({ duration: 300, enable: false });
    });

    it('never copies reserved property names, even onto an inert dictionary', () => {
        const destination = Object.create(null);
        const options = Object.fromEntries(['__proto__', 'constructor', 'prototype', 'duration'].map(key => [key, 10]));

        extend(destination, options, true);

        expect(Object.entries(destination)).toEqual([['duration', 10]]);
    });

    it('removes a configured callback and clears nullable layout references', async () => {
        const container = document.createElement('div');
        const child = container.appendChild(document.createElement('div'));
        child.className = 'mix';
        const onMixEnd = vi.fn();
        const mixer = mixitup(container, {
            callbacks: { onMixEnd },
            layout: { siblingBefore: child },
        });

        try {
            await mixer.hide();
            expect(onMixEnd).toHaveBeenCalledTimes(1);
            mixer.configure({ callbacks: { onMixEnd: null }, layout: { siblingBefore: null } });
            await mixer.show();
            expect(onMixEnd).toHaveBeenCalledTimes(1);
            expect(mixer.getConfig('layout.siblingBefore')).toBeNull();
        } finally {
            mixer.destroy();
        }
    });

    it('retains dataset items and rerenders when a nested date changes', async () => {
        class Label { text = 'label'; }
        const container = document.createElement('div');
        container.appendChild(document.createElement('div')).className = 'mix';
        const item = { id: 'a', date: new Date(100), label: new Label() };
        const render = vi.fn(() => document.createElement('div'));
        const mixer = mixitup(container, {
            data: { uidKey: 'id', dirtyCheck: true },
            load: { dataset: [item] },
            render: { target: render },
        });

        try {
            expect(mixer.getState().activeDataset?.[0]).toBe(item);
            await mixer.dataset([{ ...item, date: new Date(100) }]);
            expect(render).not.toHaveBeenCalled();
            const update = { ...item, date: new Date(200) };
            await mixer.dataset([update]);
            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toHaveBeenCalledWith(update);
            mixer.configure({ load: { dataset: [] } });
            expect(mixer.getConfig('load.dataset')).toEqual([]);
        } finally {
            mixer.destroy();
        }
    });

    it('compares class instances by identity, and arrays by length and contents', () => {
        class Price { cents = 100; }
        const price = new Price();
        expect(deepEquals({ price }, { price })).toBe(true);
        expect(deepEquals({ price }, { price: new Price() })).toBe(false);
        expect(deepEquals([price], { 0: price })).toBe(false);
        expect(deepEquals([], Array(1))).toBe(false);
        expect(deepEquals([{ cents: 100 }], [{ cents: 100 }])).toBe(true);
    });
});

describe('owner-document helpers', () => {
    it('reads scroll offsets and computed styles from the iframe', () => {
        const frame = document.body.appendChild(document.createElement('iframe'));
        try {
            const view = frame.contentWindow!;
            const doc = frame.contentDocument!;
            Object.defineProperty(view, 'pageYOffset', { value: 47 });
            Object.defineProperty(view, 'pageXOffset', { value: 13 });
            const getStyle = vi.spyOn(view, 'getComputedStyle');
            const element = doc.body.appendChild(doc.createElement('div'));
            element.style.position = 'fixed';

            expect(getDocumentState(doc)).toMatchObject({ scrollTop: 47, scrollLeft: 13 });
            expect(isVisible(element)).toBe(true);
            expect(getStyle).toHaveBeenCalledWith(element);
        } finally {
            frame.remove();
        }
    });
});
