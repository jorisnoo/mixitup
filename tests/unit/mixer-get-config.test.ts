import { describe, it, expect } from 'vitest';
import mixitup, { messages } from '../../src/index';
import * as dom from '../mock/dom';

describe('mixitup.Mixer', () => {
    const container = dom.getContainer();
    const mixer = mixitup(container);

    describe('#getConfig()', () => {
        it('should retrieve the whole config object if no stringKey passed', () => {
            const config = mixer.getConfig();

            expect(config).toBeTruthy();
            expect(typeof config).toBe('object');
            expect(config.animation).toBeTruthy();
        });

        it('should retrieve a config sub-object if single prop stringKey passed', () => {
            const config = mixer.getConfig('animation');

            expect(config).toBeTruthy();
            expect(typeof config).toBe('object');
            expect(config.effects).toBeDefined();
        });

        it('should retrieve a nested property value if multi-prop stringKey passed', () => {
            const config = mixer.getConfig('animation.effects');

            expect(typeof config).toBe('string');
        });

        it('should retrieve the current configuration, reflective of any changes', () => {
            const newEffects = 'fade translateZ(-100px)';

            mixer.configure({
                animation: {
                    effects: newEffects
                }
            });

            const newConfig = mixer.getConfig('animation.effects');

            expect(newConfig).toBe(newEffects);
        });

        it('should throw an error if an invalid configuration option is passed', () => {
            expect(() => {
                mixer.configure({
                    animations: {}
                } as any);
            }).toThrow(TypeError);
        });
    });
});
