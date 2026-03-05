import type { ConfigClassNames } from './types/config';

/**
 * Merges the properties of the source object onto the target object.
 * Alters the target object.
 */
export function extend(
    destination: Record<string, any>,
    source: Record<string, any> | any[] | null | undefined,
    deep: boolean = false,
    handleErrors: boolean = false
): Record<string, any> {
    let sourceKeys: string[] = [];
    const src = source as any;

    try {
        if (Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                sourceKeys.push(String(i));
            }
        } else if (source) {
            sourceKeys = Object.keys(source);
        }

        for (let i = 0; i < sourceKeys.length; i++) {
            const key = sourceKeys[i];

            if (!deep || typeof src[key] !== 'object' || isElement(src[key])) {
                destination[key] = src[key];
            } else if (Array.isArray(src[key])) {
                if (!destination[key]) {
                    destination[key] = [];
                }

                extend(destination[key], src[key], deep, handleErrors);
            } else {
                if (!destination[key]) {
                    destination[key] = {};
                }

                extend(destination[key], src[key], deep, handleErrors);
            }
        }
    } catch (err) {
        if (handleErrors) {
            handleExtendError(err, destination);
        } else {
            throw err;
        }
    }

    return destination;
}

function handleExtendError(err: unknown, destination: Record<string, any>): void {
    const re = /property "?(\w*)"?[,:] object/i;

    if (err instanceof TypeError) {
        const matches = re.exec(err.message);

        if (matches) {
            const erroneous = matches[1];
            let probableMatch = '';
            let mostMatchingChars = -1;

            for (const key in destination) {
                let i = 0;

                while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
                    i++;
                }

                if (i > mostMatchingChars) {
                    mostMatchingChars = i;
                    probableMatch = key;
                }
            }

            let suggestion = '';

            if (mostMatchingChars > 1) {
                suggestion = `Did you mean "${probableMatch}"?`;
            }

            const message = `[MixItUp] Invalid config property "${erroneous}". ${suggestion}`.trim();

            throw new TypeError(message);
        }
    }

    throw err;
}

/**
 * Compiles a template string with ${placeholder} syntax into a render function.
 */
export function template(str: string): (data?: Record<string, any>) => string {
    const re = /\${([\w]*)}/g;
    const dynamics: Record<string, RegExp> = {};
    let matches: RegExpExecArray | null;

    while ((matches = re.exec(str))) {
        dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
    }

    return (data?: Record<string, any>): string => {
        let output = str;

        data = data || {};

        for (const key in dynamics) {
            output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
        }

        return output;
    };
}

/**
 * Returns the index of an element among its siblings, optionally filtered by selector.
 */
export function index(el: Element, selector?: string): number {
    let i = 0;
    let sibling: Element | null = el.previousElementSibling;

    while (sibling !== null) {
        if (!selector || sibling.matches(selector)) {
            ++i;
        }

        sibling = sibling.previousElementSibling;
    }

    return i;
}

/**
 * Converts a dash or snake-case string to camel case.
 */
export function camelCase(str: string): string {
    return str.toLowerCase().replace(/([_-][a-z])/g, ($1) => {
        return $1.toUpperCase().replace(/[_-]/, '');
    });
}

/**
 * Converts a dash or snake-case string to pascal case.
 */
export function pascalCase(str: string): string {
    const camel = camelCase(str);

    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Converts a camel or pascal-case string to dash case.
 */
export function dashCase(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
}

/**
 * Checks if a value is a DOM element.
 */
export function isElement(el: any, doc?: Document): boolean {
    doc = doc || window.document;

    if (window.HTMLElement && el instanceof window.HTMLElement) {
        return true;
    } else if (
        doc.defaultView &&
        doc.defaultView.HTMLElement &&
        el instanceof doc.defaultView.HTMLElement
    ) {
        return true;
    } else {
        return (
            el !== null &&
            el.nodeType === 1 &&
            typeof el.nodeName === 'string'
        );
    }
}

/**
 * Creates a DocumentFragment from an HTML string.
 */
export function createElement(htmlString: string, doc?: Document): DocumentFragment {
    doc = doc || window.document;

    const frag = doc.createDocumentFragment();
    const temp = doc.createElement('div');

    temp.innerHTML = htmlString.trim();

    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }

    return frag;
}

/**
 * Removes preceding text nodes (whitespace) from a given node.
 */
export function removeWhitespace(node: Node | null): void {
    let deleting: Node;

    while (node && node.nodeName === '#text') {
        deleting = node;

        node = node.previousSibling;

        deleting.parentElement?.removeChild(deleting);
    }
}

/**
 * Compares two arrays for shallow equality.
 */
export function isEqualArray(a: any[], b: any[]): boolean {
    let i = a.length;

    if (i !== b.length) return false;

    while (i--) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

/**
 * Deep equality comparison for objects and primitives.
 */
export function deepEquals(a: any, b: any): boolean {
    if (typeof a === 'object' && a && typeof b === 'object' && b) {
        if (Object.keys(a).length !== Object.keys(b).length) return false;

        for (const key in a) {
            if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEquals(a[key], b[key])) return false;
        }
    } else if (a !== b) {
        return false;
    }

    return true;
}

/**
 * Returns a shuffled copy of an array using Fisher-Yates.
 */
export function arrayShuffle<T>(oldArray: T[]): T[] {
    const newArray = oldArray.slice();
    const len = newArray.length;
    let i = len;

    while (i--) {
        const p = ~~(Math.random() * len);
        const t = newArray[i];

        newArray[i] = newArray[p];
        newArray[p] = t;
    }

    return newArray;
}

/**
 * Creates a debounced version of a function.
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    immediate: boolean = false
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        const callNow = immediate && !timeout;

        const later = () => {
            timeout = null;

            if (!immediate) {
                func(...args);
            }
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) func(...args);
    };
}

/**
 * Calculates the absolute position of an element relative to the document.
 */
export function position(element: HTMLElement): { x: number; y: number } {
    let xPosition = 0;
    let yPosition = 0;
    let offsetParent: Element | null = element;
    let current: HTMLElement | null = element;

    while (current) {
        xPosition -= current.scrollLeft;
        yPosition -= current.scrollTop;

        if (current === offsetParent) {
            xPosition += current.offsetLeft;
            yPosition += current.offsetTop;

            offsetParent = current.offsetParent;
        }

        current = current.parentElement;
    }

    return { x: xPosition, y: yPosition };
}

/**
 * Calculates the hypotenuse (distance) between two points.
 */
export function getHypotenuse(
    node1: { x: number; y: number },
    node2: { x: number; y: number }
): number {
    const distanceX = Math.abs(node1.x - node2.x);
    const distanceY = Math.abs(node1.y - node2.y);

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

/**
 * Calculates the area of intersection between two rectangles as a ratio
 * of the first rectangle's area.
 */
export function getIntersectionRatio(
    box1: { left: number; top: number; width: number; height: number },
    box2: { left: number; top: number; width: number; height: number }
): number {
    const controlArea = box1.width * box1.height;

    const intersectionX =
        Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));

    const intersectionY =
        Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));

    const intersectionArea = intersectionY * intersectionX;

    return intersectionArea / controlArea;
}

/**
 * Returns direct children of an element matching a selector using :scope.
 */
export function children(el: Element, selector: string): Element[] {
    if (!el) return [];

    return Array.from(el.querySelectorAll(':scope > ' + selector));
}

/**
 * Creates a clone of an array with empty strings removed.
 */
export function clean<T>(originalArray: T[]): T[] {
    const cleanArray: T[] = [];

    for (let i = 0; i < originalArray.length; i++) {
        if ((originalArray[i] as any) !== '') {
            cleanArray.push(originalArray[i]);
        }
    }

    return cleanArray;
}

/**
 * Generates a random 6-character hex string.
 */
export function randomHex(): string {
    return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
}

/**
 * Returns the current document scroll and viewport state.
 */
export function getDocumentState(doc?: Document): {
    scrollTop: number;
    scrollLeft: number;
    docHeight: number;
    docWidth: number;
    viewportHeight: number;
    viewportWidth: number;
} {
    doc = doc && typeof doc.body === 'object' ? doc : window.document;

    return {
        scrollTop: window.pageYOffset,
        scrollLeft: window.pageXOffset,
        docHeight: doc.documentElement.scrollHeight,
        docWidth: doc.documentElement.scrollWidth,
        viewportHeight: doc.documentElement.clientHeight,
        viewportWidth: doc.documentElement.clientWidth,
    };
}

/**
 * Checks whether an element is visible in the DOM.
 */
export function isVisible(el: HTMLElement): boolean {
    if (el.offsetParent) return true;

    const styles = window.getComputedStyle(el);

    if (
        styles.position === 'fixed' &&
        styles.visibility !== 'hidden' &&
        styles.opacity !== '0'
    ) {
        return true;
    }

    return false;
}

/**
 * Builds a BEM-style class name from config class names.
 */
export function getClassname(classNames: ConfigClassNames, elementName: string, modifier?: string): string {
    let classname = '';

    classname += classNames.block;

    if (classname.length) {
        classname += classNames.delineatorElement;
    }

    classname += (classNames as any)['element' + pascalCase(elementName)];

    if (!modifier) return classname;

    if (classname.length) {
        classname += classNames.delineatorModifier;
    }

    classname += modifier;

    return classname;
}

/**
 * Returns the value of a nested property on an object via a dot-delimited string key.
 */
export function getProperty(obj: any, stringKey: string): any {
    const parts = stringKey.split('.');

    if (!stringKey) {
        return obj;
    }

    let current: any = obj;

    for (let i = 0; i < parts.length; i++) {
        if (!current) {
            return null;
        }

        current = current[parts[i]];
    }

    return typeof current !== 'undefined' ? current : null;
}
