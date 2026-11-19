import { afterEach, describe, expect, it, vi } from 'vitest';
import mixitup from '../../src/index';
import { getContainer } from '../mock/dom';

function frameClock(view: Window) {
    const pending = new Map<number, FrameRequestCallback>();
    let id = 0;
    const request = vi.spyOn(view, 'requestAnimationFrame').mockImplementation(fn => {
        pending.set(++id, fn);
        return id;
    });
    vi.spyOn(view, 'cancelAnimationFrame').mockImplementation(key => { pending.delete(key); });
    return {
        request,
        tick() {
            const frames = Array.from(pending.values());
            pending.clear();
            for (const fn of frames) fn(0);
        },
    };
}

function fixedContainer() {
    const container = getContainer();
    container.style.cssText = 'position: fixed; box-sizing: border-box';
    document.body.append(container);
    return container;
}

function transition(target: Element, type = 'transitionend', propertyName = 'opacity') {
    const event = new target.ownerDocument.defaultView!.Event(type, { bubbles: true });
    Object.defineProperty(event, 'propertyName', { value: propertyName });
    target.dispatchEvent(event);
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.replaceChildren();
});

describe('animated operations', () => {
    it('waits for each target, ignores unrelated and duplicate events, and completes exactly once', async () => {
        const clock = frameClock(document.defaultView!);
        const container = fixedContainer();
        const end = vi.fn();
        const mixer = mixitup(container, { callbacks: { onMixEnd: end } });
        const targets = mixer.getState().targets as HTMLElement[];
        const completion = mixer.hide();
        expect(mixer.isMixing()).toBe(true);
        clock.tick();
        expect(targets[0].style.transform).not.toBe('');
        clock.tick();
        expect(targets[0].style.transition).toContain('opacity');
        const nested = document.createElement('span');
        nested.className = 'mix';
        targets[0].append(nested);
        transition(nested);
        transition(targets[0], 'transitionend', 'color');
        for (const target of targets.slice(1)) {
            transition(target, 'transitioncancel');
            transition(target);
        }
        expect(end).not.toHaveBeenCalled();
        transition(targets[0]);
        transition(targets[0], 'transitioncancel');
        const state = await completion;
        expect(state.totalHide).toBe(targets.length);
        expect(mixer.isMixing()).toBe(false);
        expect(end).toHaveBeenCalledTimes(1);
        expect(targets.every(target => target.style.transition === '' && target.style.display === 'none')).toBe(true);
        mixer.destroy();
    });

    it('recovers from a missing event after the longest custom stagger and drains the queue', async () => {
        vi.useFakeTimers();
        const clock = frameClock(document.defaultView!);
        const container = fixedContainer();
        const end = vi.fn();
        const mixer = mixitup(container, {
            animation: { duration: 20, effects: 'fade stagger(10ms)', staggerSequence: i => i * 10 },
            callbacks: { onMixEnd: end },
        });
        const hiding = mixer.hide();
        const showing = mixer.filter('all', false);
        clock.tick();
        clock.tick();
        const targets = mixer.getState().targets;
        targets.slice(0, -1).forEach(target => transition(target));
        vi.advanceTimersByTime(519); // last delay 500 ms + duration 20 ms
        expect(end).not.toHaveBeenCalled();
        vi.runAllTimers();
        expect((await hiding).totalHide).toBe(6);
        expect((await showing).totalShow).toBe(6);
        transition(targets[5]);
        expect(end).toHaveBeenCalledTimes(2);
        expect(mixer.isMixing()).toBe(false);
        mixer.destroy();
    });

    it('does not animate a filter or dataset when animation is disabled, even on explicit request', async () => {
        const clock = frameClock(document.defaultView!);
        const container = fixedContainer();
        const mixer = mixitup(container, { animation: { enable: false } });
        expect((await mixer.filter('none', true)).totalHide).toBe(6);
        expect(mixer.isMixing()).toBe(false);
        mixer.destroy();
        const dataset = Array.from(container.querySelectorAll('.mix'), el => ({ id: el.id }));
        const dataMixer = mixitup(container, {
            animation: { enable: false }, data: { uidKey: 'id' }, load: { dataset },
        });
        expect((await dataMixer.dataset([], true)).totalShow).toBe(0);
        expect(dataMixer.isMixing()).toBe(false);
        expect(clock.request).not.toHaveBeenCalled();
        dataMixer.destroy();
    });

    it.each([0, 1, 2])('destroy after %i frames settles pending promises without end callbacks or later mutations', async frames => {
        vi.useFakeTimers();
        const clock = frameClock(document.defaultView!);
        const container = fixedContainer();
        const end = vi.fn();
        const perCall = vi.fn();
        const mixer = mixitup(container, {
            layout: { containerClassName: 'grid' }, callbacks: { onMixEnd: end },
        });
        const targets = mixer.getState().targets as HTMLElement[];
        const current = mixer.filter('none', perCall);
        const queued = mixer.show();
        for (let i = 0; i < frames; i++) clock.tick();
        mixer.destroy(true);
        expect(mixer.isMixing()).toBe(false);
        const [currentState, queuedState] = await Promise.all([current, queued]);
        expect(queuedState).toBe(currentState);
        expect(container.classList.contains('grid')).toBe(false);
        clock.tick();
        vi.runAllTimers();
        targets.forEach(target => transition(target));
        expect(end).not.toHaveBeenCalled();
        expect(perCall).not.toHaveBeenCalled();
        expect(targets.every(target => !target.style.display && !target.style.transform && !target.style.transition)).toBe(true);
    });

    it('uses the iframe realm for rendering, sorting, measuring, frames, scroll correction and events', async () => {
        const iframe = document.createElement('iframe');
        document.body.append(iframe);
        const doc = iframe.contentDocument!;
        const view = doc.defaultView!;
        const container = doc.createElement('div');
        container.style.cssText = 'position:fixed; box-sizing:border-box';
        container.innerHTML = '<div class="mix" data-n="2"></div><div class="mix" data-n="1"></div>';
        doc.body.append(container);
        const el = container.firstElementChild!;
        const clock = frameClock(view);
        const measure = vi.spyOn(view, 'getComputedStyle');
        const fragments = vi.spyOn(doc, 'createDocumentFragment');
        const text = vi.spyOn(doc, 'createTextNode');
        const scroll = vi.spyOn(view, 'scrollTo').mockImplementation(() => {});
        const outerScroll = vi.spyOn(window, 'scrollTo');
        let offset = 42;
        Object.defineProperty(view, 'pageYOffset', { configurable: true, get: () => offset });
        const starts: Event[] = [];
        container.addEventListener('mixStart', event => starts.push(event));
        const mixer = mixitup(container, {
            animation: { animateResizeTargets: true },
            callbacks: { onMixStart() { offset = 84; } },
        }, doc);

        const sorting = mixer.sort('n:asc');
        expect(starts[0]).toBeInstanceOf(view.CustomEvent);
        expect(scroll).toHaveBeenCalledWith(0, 42);
        expect(outerScroll).not.toHaveBeenCalled();
        expect(measure).toHaveBeenCalledWith(container);
        expect(measure).toHaveBeenCalledWith(el);
        expect(fragments).toHaveBeenCalled();
        expect(text).toHaveBeenCalledWith(' ');
        expect(clock.request).toHaveBeenCalledTimes(1);
        clock.tick();
        clock.tick();
        for (const target of container.querySelectorAll('.mix')) transition(target);
        expect((await sorting).targets[1]).toBe(el);
        mixer.destroy();

        const datasetContainer = doc.createElement('div');
        doc.body.append(datasetContainer);
        const dataMixer = mixitup(datasetContainer, {
            animation: { enable: false }, data: { uidKey: 'id' },
            render: { target: () => '<div class="mix"></div>' },
        }, doc);
        const parser = vi.spyOn(doc, 'createElement');
        const outerParser = vi.spyOn(document, 'createElement');
        const state = await dataMixer.dataset([{ id: 'foreign' }]);
        expect(parser).toHaveBeenCalledWith('div');
        expect(outerParser).not.toHaveBeenCalledWith('div');
        expect(state.targets[0].ownerDocument).toBe(doc);
        dataMixer.destroy();
    });
});
