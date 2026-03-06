import { describe, it, expect, afterAll } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    describe('#getState()', () => {
        const container = dom.getContainer();
        const id = container.id = 'test-id';
        const mixer = mixitup(container);
        const state = mixer.getState();

        afterAll(() => mixer.destroy());

        it('should contain an id equal to the container id', () => {
            expect(state.container.id).toBe(id);
        });

        it('should contain a reference to the container element', () => {
            expect(state.container).toBe(container);
        });

        it('should contain an activeFilter object with the default selector active', () => {
            expect(state.activeFilter).toBeTruthy();
            expect(state.activeFilter.selector).toBe('.mix');
        });

        it('should contain an activeSort object with the default sort string active', () => {
            expect(state.activeSort).toBeTruthy();
            expect(state.activeSort.sortString).toBe('default:asc');
        });

        it('should contain an empty activeContainerClassName string', () => {
            expect(state.activeContainerClassName).toBe('');
        });

        it('should contain a null activeDataset', () => {
            expect(state.activeDataset).toEqual(null);
        });

        it('should contain a hasFailed boolean, set to false', () => {
            expect(state.hasFailed).toEqual(false);
        });

        it('should contain a list of targets deeply equaling the contents of the container', () => {
            expect(state.targets).toEqual(Array.from(container.querySelectorAll('.mix')));
        });

        it('should contain a totalTargets integer, equal to the number of targets in the container', () => {
            expect(state.totalTargets).toBe(container.querySelectorAll('.mix').length);
        });

        it('should contain a list of targets currently shown', () => {
            expect(state.show).toEqual(Array.from(container.querySelectorAll('.mix')));
            expect(state.show).toEqual(state.targets);
        });

        it('should contain a totalShow integer, equal to the number of targets shown', () => {
            expect(state.totalShow).toBe(container.querySelectorAll('.mix').length);
        });

        it('should contain a list of targets matching the active selector', () => {
            expect(state.matching).toEqual(Array.from(container.querySelectorAll('.mix')));
            expect(state.matching).toEqual(state.targets);
        });

        it('should contain a totalMatching integer, equal to the number of targets matching the active selector', () => {
            expect(state.totalMatching).toBe(container.querySelectorAll('.mix').length);
        });

        it('should contain a list of targets currently hidden', () => {
            expect(state.hide).toEqual([]);
        });

        it('should contain a totalHide integer, equal to the number of targets hidden', () => {
            expect(state.totalHide).toBe(0);
        });

        it('should contain a null triggerElement reference', () => {
            expect(state.triggerElement).toBe(null);
        });
    });
});
