import type { ConfigAnimation } from '../types/config';

export function createDefaultAnimation(): ConfigAnimation {
    return {
        enable: true,
        effects: 'fade scale',
        effectsIn: '',
        effectsOut: '',
        duration: 600,
        easing: 'ease',
        applyPerspective: true,
        perspectiveDistance: '3000px',
        perspectiveOrigin: '50% 50%',
        queue: true,
        queueLimit: 3,
        animateResizeContainer: true,
        animateResizeTargets: false,
        staggerSequence: null,
        reverseOut: false,
        nudge: true,
        clampHeight: true,
        clampWidth: true,
    };
}
