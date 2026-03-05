/**
 * Simplified feature constants for modern browsers.
 * All vendor prefix detection has been removed — standard CSS property names are used directly.
 */

export interface Features {
    readonly boxSizingProp: string;
    readonly transformProp: string;
    readonly transformRule: string;
    readonly transitionProp: string;
    readonly perspectiveProp: string;
    readonly perspectiveOriginProp: string;
    readonly hasTransitions: boolean;
    readonly TWEENABLE: readonly string[];
}

export const features: Features = {
    boxSizingProp: 'boxSizing',
    transformProp: 'transform',
    transformRule: 'transform',
    transitionProp: 'transition',
    perspectiveProp: 'perspective',
    perspectiveOriginProp: 'perspectiveOrigin',
    hasTransitions: true,
    TWEENABLE: [
        'opacity',
        'width', 'height',
        'marginRight', 'marginBottom',
        'x', 'y',
        'scale',
        'translateX', 'translateY', 'translateZ',
        'rotateX', 'rotateY', 'rotateZ',
    ],
};
