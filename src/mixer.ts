import type { MixitupConfig } from './types/config';
import type { MixitupState } from './types/state';
import type { MixitupMixer } from './types/public-api';
import type { StyleData, TransformData, IMoveData } from './types/style-data';
import type {
    CommandMultimix,
    CommandFilter,
    CommandSort,
    CommandInsert,
    CommandRemove,
    CommandDataset,
    CommandChangeLayout,
} from './types/commands';
import type { Operation } from './operation';
import type { QueueItem } from './internal/queue-item';
import type { UserInstruction } from './internal/user-instruction';

import { createDefaultConfig } from './config/defaults';
import { createOperation } from './operation';
import { createQueueItem } from './internal/queue-item';
import { createUserInstruction } from './internal/user-instruction';
import {
    createCommandFilter,
    createCommandSort,
    createCommandInsert,
    createCommandRemove,
    createCommandDataset,
    createCommandChangeLayout,
    createCommandMultimix,
} from './types/commands';
import { Target } from './target';
import { Control, controls } from './control';
import { controlDefinitions } from './control-definition';
import { fire } from './events';
import { features } from './features';
import { messages } from './messages';
import {
    extend,
    index,
    children,
    clean,
    randomHex,
    getDocumentState,
    isElement,
    isVisible,
    isEqualArray,
    deepEquals,
    arrayShuffle,
    removeWhitespace,
    dashCase,
    getClassname,
    getProperty,
    createElement,
} from './helpers';

interface MixerDom {
    document: Document | null;
    body: Element | null;
    container: HTMLElement | null;
    parent: HTMLElement | null;
    targets: Element[];
}

export const instances: Map<string, Mixer> = new Map();

function createStyleData(): StyleData {
    return {
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        marginRight: 0,
        marginBottom: 0,
        opacity: 1,
        scale: { value: 0, unit: '' },
        translateX: { value: 0, unit: '' },
        translateY: { value: 0, unit: '' },
        translateZ: { value: 0, unit: '' },
        rotateX: { value: 0, unit: '' },
        rotateY: { value: 0, unit: '' },
        rotateZ: { value: 0, unit: '' },
    };
}

function createMoveData(): IMoveData {
    return {
        posIn: null,
        posOut: null,
        operation: null,
        callback: null,
        statusChange: 'none',
        duration: 0,
        staggerIndex: 0,
        tweenData: {},
    };
}

const TRANSFORM_DEFAULTS: Record<string, TransformData> = {
    scale: { value: 0.01, unit: '' },
    translateX: { value: 20, unit: 'px' },
    translateY: { value: 20, unit: 'px' },
    translateZ: { value: 20, unit: 'px' },
    rotateX: { value: 20, unit: 'deg' },
    rotateY: { value: 20, unit: 'deg' },
    rotateZ: { value: 20, unit: 'deg' },
};

export class Mixer implements MixitupMixer {
    config: MixitupConfig = createDefaultConfig();
    id: string = '';

    isBusy: boolean = false;
    isToggling: boolean = false;
    incPadding: boolean = true;

    controls: Control[] = [];
    targets: Target[] = [];
    origOrder: Target[] = [];
    cache: Record<string, Target> = {};

    toggleArray: string[] = [];

    targetsMoved: number = 0;
    targetsImmovable: number = 0;
    targetsBound: number = 0;
    targetsDone: number = 0;

    staggerDuration: number = 0;
    effectsIn: StyleData | null = null;
    effectsOut: StyleData | null = null;
    transformIn: string[] = [];
    transformOut: string[] = [];
    queue: QueueItem[] = [];

    state: MixitupState | null = null;
    lastOperation: Operation | null = null;
    lastClicked: Element | null = null;
    userCallback: ((...args: any[]) => void) | null = null;
    userDeferred: { resolve: (value: any) => void; reject: (reason?: any) => void; promise: Promise<any> } | null = null;

    dom: MixerDom = {
        document: null,
        body: null,
        container: null,
        parent: null,
        targets: [],
    };

    attach(container: HTMLElement, doc: Document, id: string, config?: Partial<MixitupConfig>): void {
        this.id = id;

        if (config) {
            extend(this.config, config as Record<string, any>, true, true);
        }

        this.sanitizeConfig();
        this.cacheDom(container, doc);

        if (this.config.layout.containerClassName) {
            this.dom.container!.classList.add(this.config.layout.containerClassName);
        }

        if (this.config.data.uidKey) {
            this.config.controls.enable = false;
        }

        this.indexTargets();

        this.state = this.getInitialState();

        for (const target of this.lastOperation!.toHide as Target[]) {
            target.hide();
        }

        if (this.config.controls.enable) {
            this.initControls();
            this.buildToggleArray(null, this.state);
            this.updateControls({
                filter: this.state!.activeFilter,
                sort: this.state!.activeSort,
            });
        }

        this.parseEffects();
    }

    private sanitizeConfig(): void {
        this.config.controls.scope = this.config.controls.scope.toLowerCase().trim() as any;
        this.config.controls.toggleLogic = this.config.controls.toggleLogic.toLowerCase().trim() as any;
        this.config.controls.toggleDefault = this.config.controls.toggleDefault.toLowerCase().trim() as any;
        this.config.animation.effects = this.config.animation.effects.trim();
    }

    private getInitialState(): MixitupState {
        let state = this.createMutableState();
        let operation = createOperation();

        state.activeContainerClassName = this.config.layout.containerClassName;

        if (this.config.load.dataset) {
            if (!this.config.data.uidKey || typeof this.config.data.uidKey !== 'string') {
                throw new TypeError((messages.errorConfigDataUidKeyNotSet as Function)());
            }

            operation.startDataset = operation.newDataset = state.activeDataset = this.config.load.dataset.slice();
            operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
            operation.show = this.targets.slice() as any;
        } else {
            state.activeFilter = this.parseFilterArgs([this.config.load.filter]).command as CommandFilter;
            state.activeSort = this.parseSortArgs([this.config.load.sort]).command as CommandSort;
            state.totalTargets = this.targets.length;

            if (
                (state.activeSort as CommandSort).collection ||
                (state.activeSort as CommandSort).attribute ||
                (state.activeSort as CommandSort).order === 'random' ||
                (state.activeSort as CommandSort).order === 'desc'
            ) {
                operation.newSort = state.activeSort as CommandSort;
                this.sortOperation(operation);
                this.printSort(false, operation);
                this.targets = operation.newOrder as Target[];
            } else {
                operation.startOrder = operation.newOrder = this.targets as any;
            }

            operation.startFilter = operation.newFilter = state.activeFilter as CommandFilter;
            operation.startSort = operation.newSort = state.activeSort as CommandSort;
            operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;

            if (operation.newFilter!.selector === 'all') {
                operation.newFilter!.selector = this.config.selectors.target;
            } else if (operation.newFilter!.selector === 'none') {
                operation.newFilter!.selector = '';
            }
        }

        this.lastOperation = operation;

        if (operation.newFilter) {
            this.filterOperation(operation);
        }

        state = this.buildState(operation);

        return state;
    }

    private cacheDom(el: HTMLElement, doc: Document): void {
        this.dom.document = doc;
        this.dom.body = this.dom.document.querySelector('body');
        this.dom.container = el;
        this.dom.parent = el;
    }

    private indexTargets(): void {
        const domTargets = this.config.layout.allowNestedTargets
            ? this.dom.container!.querySelectorAll(this.config.selectors.target)
            : children(this.dom.container!, this.config.selectors.target);

        this.dom.targets = Array.from(domTargets);
        this.targets = [];

        const dataset = this.config.load.dataset;

        if (dataset && dataset.length !== this.dom.targets.length) {
            throw new Error((messages.errorDatasetPrerenderedMismatch as Function)());
        }

        if (this.dom.targets.length) {
            for (let i = 0; i < this.dom.targets.length; i++) {
                const el = this.dom.targets[i];
                const target = new Target();

                target.init(el, this, dataset ? dataset[i] : undefined);
                target.isInDom = true;

                this.targets.push(target);
            }

            this.dom.parent = this.dom.targets[0].parentElement === this.dom.container
                ? this.dom.container
                : this.dom.targets[0].parentElement as HTMLElement;
        }

        this.origOrder = this.targets;
    }

    private initControls(): void {
        let parent: Element | Document;

        switch (this.config.controls.scope) {
            case 'local':
                parent = this.dom.container!;
                break;
            case 'global':
                parent = this.dom.document!;
                break;
            default:
                throw new Error((messages.errorConfigInvalidControlsScope as Function)());
        }

        for (const definition of controlDefinitions) {
            if (this.config.controls.live || definition.live) {
                let delegators: (Element | Document)[];

                if (definition.parent) {
                    const domProp = (this.dom as any)[definition.parent];

                    if (!domProp || (Array.isArray(domProp) && domProp.length < 1)) continue;

                    delegators = typeof domProp.length === 'number' ? Array.from(domProp) : [domProp];
                } else {
                    delegators = [parent];
                }

                for (const el of delegators) {
                    const control = this.getControl(el as HTMLElement, definition.type, definition.selector);
                    this.controls.push(control);
                }
            } else {
                const controlElements = parent.querySelectorAll(
                    this.config.selectors.control + definition.selector
                );

                for (let j = 0; j < controlElements.length; j++) {
                    const el = controlElements[j] as HTMLElement;
                    const control = this.getControl(el, definition.type, '');

                    if (!control) continue;

                    this.controls.push(control);
                }
            }
        }
    }

    private getControl(el: HTMLElement, type: string, selector: string): Control {
        if (!selector) {
            for (const control of controls) {
                if (control.el === el && control.isBound(this)) {
                    return null as any;
                } else if (control.el === el && control.type === type && control.selector === selector) {
                    control.addBinding(this);
                    return control;
                }
            }
        }

        const control = new Control();

        control.init(el, type, selector);

        control.classNames.base = getClassname(this.config.classNames, type);
        control.classNames.active = getClassname(this.config.classNames, type, this.config.classNames.modifierActive);
        control.classNames.disabled = getClassname(this.config.classNames, type, this.config.classNames.modifierDisabled);

        control.addBinding(this);

        return control;
    }

    private getToggleSelector(): string {
        this.toggleArray = clean(this.toggleArray);

        const delineator = this.config.controls.toggleLogic === 'or' ? ', ' : '';
        let toggleSelector = this.toggleArray.join(delineator);

        if (toggleSelector === '') {
            toggleSelector = this.config.controls.toggleDefault;
        }

        return toggleSelector;
    }

    private buildToggleArray(command: any, state?: MixitupState | null): void {
        let activeFilterSelector = '';

        if (command && command.filter) {
            activeFilterSelector = command.filter.selector.replace(/\s/g, '');
        } else if (state) {
            activeFilterSelector = (state.activeFilter as CommandFilter).selector.replace(/\s/g, '');
        } else {
            return;
        }

        if (activeFilterSelector === this.config.selectors.target || activeFilterSelector === 'all') {
            activeFilterSelector = '';
        }

        if (this.config.controls.toggleLogic === 'or') {
            this.toggleArray = activeFilterSelector.split(',');
        } else {
            this.toggleArray = this.splitCompoundSelector(activeFilterSelector);
        }

        this.toggleArray = clean(this.toggleArray);
    }

    private splitCompoundSelector(compoundSelector: string): string[] {
        const partials = compoundSelector.split(/([\.\[])/g);
        const toggleArray: string[] = [];
        let selector = '';

        if (partials[0] === '') {
            partials.shift();
        }

        for (let i = 0; i < partials.length; i++) {
            if (i % 2 === 0) {
                selector = '';
            }

            selector += partials[i];

            if (i % 2 !== 0) {
                toggleArray.push(selector);
            }
        }

        return toggleArray;
    }

    private updateControls(command: any): void {
        const output: Record<string, any> = {};

        if (command.filter) {
            output.filter = command.filter.selector;
        } else {
            output.filter = (this.state!.activeFilter as CommandFilter).selector;
        }

        if (command.sort) {
            output.sort = this.buildSortString(command.sort);
        } else {
            output.sort = this.buildSortString(this.state!.activeSort as CommandSort);
        }

        if (output.filter === this.config.selectors.target) {
            output.filter = 'all';
        }

        if (output.filter === '') {
            output.filter = 'none';
        }

        Object.freeze(output);

        for (const control of this.controls) {
            control.update(output, this.toggleArray);
        }
    }

    private buildSortString(command: CommandSort): string {
        let output = command.sortString;

        if (command.next) {
            output += ' ' + this.buildSortString(command.next);
        }

        return output;
    }

    private insertTargets(command: CommandInsert, operation: Operation): void {
        if (typeof command.index === 'undefined') command.index = 0;

        const nextSibling = this.getNextSibling(command.index, command.sibling, command.position);
        const frag = this.dom.document!.createDocumentFragment();
        let insertionIndex: number;

        if (nextSibling) {
            insertionIndex = index(nextSibling, this.config.selectors.target);
        } else {
            insertionIndex = this.targets.length;
        }

        if (command.collection) {
            for (const el of command.collection) {
                if (this.dom.targets.indexOf(el) > -1) {
                    throw new Error((messages.errorInsertPreexistingElement as Function)());
                }

                (el as HTMLElement).style.display = 'none';

                frag.appendChild(el);
                frag.appendChild(this.dom.document!.createTextNode(' '));

                if (!isElement(el, this.dom.document!) || !el.matches(this.config.selectors.target)) continue;

                const target = new Target();

                target.init(el, this);
                target.isInDom = true;

                this.targets.splice(insertionIndex, 0, target);
                insertionIndex++;
            }

            this.dom.parent!.insertBefore(frag, nextSibling);
        }

        operation.startOrder = this.origOrder = this.targets as any;
    }

    private getNextSibling(idx: number, sibling?: Element | null, position?: string): Element | null {
        let element: Element | null = null;

        idx = Math.max(idx, 0);

        if (sibling && position === 'before') {
            element = sibling;
        } else if (sibling && position === 'after') {
            element = sibling.nextElementSibling || null;
        } else if (this.targets.length > 0 && typeof idx !== 'undefined') {
            element = (idx < this.targets.length || !this.targets.length)
                ? this.targets[idx].dom.el
                : this.targets[this.targets.length - 1].dom.el!.nextElementSibling;
        } else if (this.targets.length === 0 && this.dom.parent!.children.length > 0) {
            if (this.config.layout.siblingAfter) {
                element = this.config.layout.siblingAfter;
            } else if (this.config.layout.siblingBefore) {
                element = this.config.layout.siblingBefore.nextElementSibling;
            } else {
                element = this.dom.parent!.children[0];
            }
        }

        return element;
    }

    private filterOperation(operation: Operation): void {
        const action = operation.newFilter!.action;

        for (const target of (operation.newOrder as Target[])) {
            let testResult = false;

            if (operation.newFilter!.collection) {
                testResult = operation.newFilter!.collection.indexOf(target.dom.el!) > -1;
            } else {
                if (operation.newFilter!.selector === '') {
                    testResult = false;
                } else {
                    testResult = target.dom.el!.matches(operation.newFilter!.selector);
                }
            }

            this.evaluateHideShow(testResult, target, action, operation);
        }

        if ((operation.toRemove as Target[]).length) {
            for (let i = 0; i < (operation.show as Target[]).length; i++) {
                const target = (operation.show as Target[])[i];

                if ((operation.toRemove as Target[]).indexOf(target) > -1) {
                    (operation.show as Target[]).splice(i, 1);

                    const toShowIndex = (operation.toShow as Target[]).indexOf(target);
                    if (toShowIndex > -1) {
                        (operation.toShow as Target[]).splice(toShowIndex, 1);
                    }

                    (operation.toHide as Target[]).push(target);
                    (operation.hide as Target[]).push(target);

                    i--;
                }
            }
        }

        operation.matching = (operation.show as any[]).slice();

        if ((operation.show as any[]).length === 0 && operation.newFilter!.selector !== '' && this.targets.length !== 0) {
            operation.hasFailed = true;
        }
    }

    private evaluateHideShow(testResult: boolean, target: Target, action: string, operation: Operation): void {
        if (
            (testResult === true && action === 'show') ||
            (testResult === false && action === 'hide')
        ) {
            (operation.show as Target[]).push(target);

            if (!target.isShown) (operation.toShow as Target[]).push(target);
        } else {
            (operation.hide as Target[]).push(target);

            if (target.isShown) (operation.toHide as Target[]).push(target);
        }
    }

    private sortOperation(operation: Operation): void {
        operation.startOrder = this.targets as any;

        if (operation.newSort!.collection) {
            const newOrder: Target[] = [];

            for (const el of operation.newSort!.collection) {
                if (this.dom.targets.indexOf(el) < 0) {
                    throw new Error((messages.errorSortNonExistentElement as Function)());
                }

                const target = new Target();
                target.init(el, this);
                target.isInDom = true;
                newOrder.push(target);
            }

            operation.newOrder = newOrder as any;
        } else if (operation.newSort!.order === 'random') {
            operation.newOrder = arrayShuffle(operation.startOrder as Target[]) as any;
        } else if (operation.newSort!.attribute === '') {
            operation.newOrder = this.origOrder.slice() as any;

            if (operation.newSort!.order === 'desc') {
                (operation.newOrder as Target[]).reverse();
            }
        } else {
            operation.newOrder = (operation.startOrder as Target[]).slice() as any;

            (operation.newOrder as Target[]).sort((a: Target, b: Target) => {
                return this.compare(a, b, operation.newSort!);
            });
        }

        if (isEqualArray(operation.newOrder as any[], operation.startOrder as any[])) {
            operation.willSort = false;
        }
    }

    private compare(a: Target, b: Target, command: CommandSort): number {
        const order = command.order;
        let attrA: any = this.getAttributeValue(a, command.attribute);
        let attrB: any = this.getAttributeValue(b, command.attribute);

        if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
            attrA = attrA.toLowerCase();
            attrB = attrB.toLowerCase();
        } else {
            attrA = attrA * 1;
            attrB = attrB * 1;
        }

        if (attrA < attrB) return order === 'asc' ? -1 : 1;
        if (attrA > attrB) return order === 'asc' ? 1 : -1;
        if (attrA === attrB && command.next) return this.compare(a, b, command.next);

        return 0;
    }

    private getAttributeValue(target: Target, attribute: string): string | number {
        const value = target.dom.el!.getAttribute('data-' + attribute);

        if (value === null) {
            if (this.config.debug.showWarnings) {
                console.warn((messages.warningInconsistentSortingAttributes as Function)({
                    attribute: 'data-' + attribute,
                }));
            }
        }

        return value || 0;
    }

    private printSort(isResetting: boolean, operation: Operation): void {
        const startOrder = isResetting ? operation.newOrder as Target[] : operation.startOrder as Target[];
        const newOrder = isResetting ? operation.startOrder as Target[] : operation.newOrder as Target[];
        const nextSibling = startOrder.length
            ? startOrder[startOrder.length - 1].dom.el!.nextElementSibling
            : null;
        const frag = window.document.createDocumentFragment();

        for (const target of startOrder) {
            const el = target.dom.el as HTMLElement;

            if (el.style.position === 'absolute') continue;

            removeWhitespace(el.previousSibling);
            el.parentElement!.removeChild(el);
        }

        const whitespace = nextSibling ? nextSibling.previousSibling : this.dom.parent!.lastChild;

        if (whitespace && whitespace.nodeName === '#text') {
            removeWhitespace(whitespace);
        }

        for (const target of newOrder) {
            const el = target.dom.el as HTMLElement;

            if (isElement(frag.lastChild!)) {
                frag.appendChild(window.document.createTextNode(' '));
            }

            frag.appendChild(el);
        }

        if (this.dom.parent!.firstChild && this.dom.parent!.firstChild !== nextSibling) {
            frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
        }

        if (nextSibling) {
            frag.appendChild(window.document.createTextNode(' '));
            this.dom.parent!.insertBefore(frag, nextSibling);
        } else {
            this.dom.parent!.appendChild(frag);
        }
    }

    private parseSortString(sortString: string, command: CommandSort): CommandSort {
        const rules = sortString.split(' ');
        let current = command;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i].split(':');

            current.sortString = rules[i];
            current.attribute = dashCase(rule[0]);
            current.order = rule[1] || 'asc';

            switch (current.attribute) {
                case 'default':
                    current.attribute = '';
                    break;
                case 'random':
                    current.attribute = '';
                    current.order = 'random';
                    break;
            }

            if (!current.attribute || current.order === 'random') break;

            if (i < rules.length - 1) {
                current.next = createCommandSort();
                Object.freeze(current);
                current = current.next;
            }
        }

        return command;
    }

    private parseEffects(): void {
        const effectsIn = this.config.animation.effectsIn || this.config.animation.effects;
        const effectsOut = this.config.animation.effectsOut || this.config.animation.effects;

        this.effectsIn = createStyleData();
        this.effectsOut = createStyleData();
        this.transformIn = [];
        this.transformOut = [];

        this.effectsIn.opacity = this.effectsOut.opacity = 1;

        this.parseEffect('fade', effectsIn, this.effectsIn, this.transformIn);
        this.parseEffect('fade', effectsOut, this.effectsOut, this.transformOut, true);

        for (const transformName in TRANSFORM_DEFAULTS) {
            this.parseEffect(transformName, effectsIn, this.effectsIn, this.transformIn);
            this.parseEffect(transformName, effectsOut, this.effectsOut, this.transformOut, true);
        }

        this.parseEffect('stagger', effectsIn, this.effectsIn, this.transformIn);
        this.parseEffect('stagger', effectsOut, this.effectsOut, this.transformOut, true);
    }

    private parseEffect(
        effectName: string,
        effectString: string,
        effects: StyleData,
        transform: string[],
        isOut: boolean = false
    ): void {
        const re = /\(([^)]+)\)/;

        if (typeof effectString !== 'string') {
            throw new TypeError((messages.errorConfigInvalidAnimationEffects as Function)());
        }

        if (effectString.indexOf(effectName) < 0) {
            if (effectName === 'stagger') {
                this.staggerDuration = 0;
            }
            return;
        }

        const propIndex = effectString.indexOf(effectName + '(');
        let val = '';

        if (propIndex > -1) {
            const str = effectString.substring(propIndex);
            const match = re.exec(str);
            if (match) val = match[1];
        }

        const units = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'];

        switch (effectName) {
            case 'fade':
                effects.opacity = val ? parseFloat(val) : 0;
                break;
            case 'stagger':
                this.staggerDuration = val ? parseFloat(val) : 100;
                break;
            default: {
                const effectData = (effects as any)[effectName] as TransformData;
                const defaultData = TRANSFORM_DEFAULTS[effectName];

                if (isOut && this.config.animation.reverseOut && effectName !== 'scale') {
                    effectData.value = (val ? parseFloat(val) : defaultData.value) * -1;
                } else {
                    effectData.value = val ? parseFloat(val) : defaultData.value;
                }

                if (val) {
                    for (const unit of units) {
                        if (val.indexOf(unit) > -1) {
                            effectData.unit = unit;
                            break;
                        }
                    }
                } else {
                    effectData.unit = defaultData.unit;
                }

                transform.push(effectName + '(' + effectData.value + effectData.unit + ')');
            }
        }
    }

    private buildState(operation: Operation): MixitupState {
        const stateTargets: Element[] = [];
        const stateMatching: Element[] = [];
        const stateShow: Element[] = [];
        const stateHide: Element[] = [];

        for (const target of this.targets) {
            if (!(operation.toRemove as Target[]).length || (operation.toRemove as Target[]).indexOf(target) < 0) {
                stateTargets.push(target.dom.el!);
            }
        }

        for (const target of (operation.matching as Target[])) {
            stateMatching.push(target.dom.el!);
        }

        for (const target of (operation.show as Target[])) {
            stateShow.push(target.dom.el!);
        }

        for (const target of (operation.hide as Target[])) {
            if (!(operation.toRemove as Target[]).length || (operation.toRemove as Target[]).indexOf(target) < 0) {
                stateHide.push(target.dom.el!);
            }
        }

        return {
            id: this.id,
            container: this.dom.container!,
            activeFilter: operation.newFilter,
            activeSort: operation.newSort,
            activeDataset: operation.newDataset,
            activeContainerClassName: operation.newContainerClassName,
            hasFailed: operation.hasFailed,
            totalTargets: this.targets.length,
            totalShow: (operation.show as any[]).length,
            totalHide: (operation.hide as any[]).length,
            totalMatching: (operation.matching as any[]).length,
            triggerElement: operation.triggerElement,
            targets: stateTargets,
            show: stateShow,
            hide: stateHide,
            matching: stateMatching,
        };
    }

    private createMutableState(): any {
        return {
            id: '',
            container: null,
            activeFilter: null,
            activeSort: null,
            activeDataset: null,
            activeContainerClassName: '',
            hasFailed: false,
            totalTargets: 0,
            totalShow: 0,
            totalHide: 0,
            totalMatching: 0,
            triggerElement: null,
            targets: [],
            show: [],
            hide: [],
            matching: [],
        };
    }

    private goMix(shouldAnimate: boolean, operation: Operation): Promise<MixitupState> {
        if (
            !this.config.animation.duration ||
            !this.config.animation.effects ||
            !isVisible(this.dom.container!)
        ) {
            shouldAnimate = false;
        }

        if (
            !operation.toShow.length &&
            !operation.toHide.length &&
            !operation.willSort &&
            !operation.willChangeLayout
        ) {
            shouldAnimate = false;
        }

        if (
            !(operation.startState as any)?.show?.length &&
            !(operation.show as any[]).length
        ) {
            shouldAnimate = false;
        }

        fire('mixStart', this.dom.container!, {
            state: operation.startState as MixitupState,
            futureState: operation.newState as MixitupState,
            instance: this,
        }, this.dom.document!);

        if (typeof this.config.callbacks.onMixStart === 'function') {
            this.config.callbacks.onMixStart.call(
                this.dom.container,
                operation.startState as MixitupState,
                operation.newState as MixitupState,
                this
            );
        }

        this.dom.container!.classList.remove(
            getClassname(this.config.classNames, 'container', this.config.classNames.modifierFailed)
        );

        let deferred: { resolve: (value: any) => void; reject: (reason?: any) => void; promise: Promise<any> };

        if (!this.userDeferred) {
            deferred = this.createDeferred();
            this.userDeferred = deferred;
        } else {
            deferred = this.userDeferred;
        }

        this.isBusy = true;

        if (!shouldAnimate || !features.hasTransitions) {
            if (this.config.debug.fauxAsync) {
                setTimeout(() => {
                    this.cleanUp(operation);
                }, this.config.animation.duration);
            } else {
                this.cleanUp(operation);
            }

            return deferred.promise;
        }

        if (window.pageYOffset !== operation.docState!.scrollTop) {
            window.scrollTo(operation.docState!.scrollLeft, operation.docState!.scrollTop);
        }

        if (this.config.animation.applyPerspective) {
            (this.dom.parent! as any).style.perspective = this.config.animation.perspectiveDistance;
            (this.dom.parent! as any).style.perspectiveOrigin = this.config.animation.perspectiveOrigin;
        }

        if (
            this.config.animation.animateResizeContainer &&
            operation.startHeight !== operation.newHeight &&
            operation.viewportDeltaY !== operation.startHeight - operation.newHeight
        ) {
            this.dom.parent!.style.height = operation.startHeight + 'px';
        }

        if (
            this.config.animation.animateResizeContainer &&
            operation.startWidth !== operation.newWidth &&
            operation.viewportDeltaX !== operation.startWidth - operation.newWidth
        ) {
            this.dom.parent!.style.width = operation.startWidth + 'px';
        }

        if (operation.startHeight === operation.newHeight) {
            this.dom.parent!.style.height = operation.startHeight + 'px';
        }

        if (operation.startWidth === operation.newWidth) {
            this.dom.parent!.style.width = operation.startWidth + 'px';
        }

        if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
            this.dom.parent!.style.overflow = 'hidden';
        }

        requestAnimationFrame(() => {
            this.moveTargets(operation);
        });

        return deferred.promise;
    }

    private createDeferred(): { resolve: (value: any) => void; reject: (reason?: any) => void; promise: Promise<any> } {
        let resolve!: (value: any) => void;
        let reject!: (reason?: any) => void;

        const promise = new Promise<any>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        return { resolve, reject, promise };
    }

    private getStartMixData(operation: Operation): void {
        const parentStyle = window.getComputedStyle(this.dom.parent!);
        const parentRect = this.dom.parent!.getBoundingClientRect();
        const boxSizing = parentStyle.boxSizing;

        this.incPadding = boxSizing === 'border-box';

        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            const data = target.getPosData();

            operation.showPosData[i] = { startPosData: data } as any;
        }

        for (let i = 0; i < (operation.toHide as Target[]).length; i++) {
            const target = (operation.toHide as Target[])[i];
            const data = target.getPosData();

            operation.toHidePosData[i] = { startPosData: data } as any;
        }

        operation.startX = parentRect.left;
        operation.startY = parentRect.top;

        operation.startHeight = this.incPadding
            ? parentRect.height
            : parentRect.height -
              parseFloat(parentStyle.paddingTop) -
              parseFloat(parentStyle.paddingBottom) -
              parseFloat(parentStyle.borderTop) -
              parseFloat(parentStyle.borderBottom);

        operation.startWidth = this.incPadding
            ? parentRect.width
            : parentRect.width -
              parseFloat(parentStyle.paddingLeft) -
              parseFloat(parentStyle.paddingRight) -
              parseFloat(parentStyle.borderLeft) -
              parseFloat(parentStyle.borderRight);
    }

    private setInter(operation: Operation): void {
        if (this.config.animation.clampHeight) {
            this.dom.parent!.style.height = operation.startHeight + 'px';
            this.dom.parent!.style.overflow = 'hidden';
        }

        if (this.config.animation.clampWidth) {
            this.dom.parent!.style.width = operation.startWidth + 'px';
            this.dom.parent!.style.overflow = 'hidden';
        }

        for (const target of (operation.toShow as Target[])) {
            target.show();
        }

        if (operation.willChangeLayout) {
            this.dom.container!.classList.remove(operation.startContainerClassName);
            this.dom.container!.classList.add(operation.newContainerClassName);
        }
    }

    private getInterMixData(operation: Operation): void {
        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            (operation.showPosData[i] as any).interPosData = target.getPosData();
        }

        for (let i = 0; i < (operation.toHide as Target[]).length; i++) {
            const target = (operation.toHide as Target[])[i];
            (operation.toHidePosData[i] as any).interPosData = target.getPosData();
        }
    }

    private setFinal(operation: Operation): void {
        if (operation.willSort) this.printSort(false, operation);

        for (const target of (operation.toHide as Target[])) {
            target.hide();
        }
    }

    private getFinalMixData(operation: Operation): void {
        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            (operation.showPosData[i] as any).finalPosData = target.getPosData();
        }

        for (let i = 0; i < (operation.toHide as Target[]).length; i++) {
            const target = (operation.toHide as Target[])[i];
            (operation.toHidePosData[i] as any).finalPosData = target.getPosData();
        }

        if (this.config.animation.clampHeight || this.config.animation.clampWidth) {
            this.dom.parent!.style.height =
                this.dom.parent!.style.width =
                this.dom.parent!.style.overflow = '';
        }

        let parentStyle: CSSStyleDeclaration | null = null;

        if (!this.incPadding) {
            parentStyle = window.getComputedStyle(this.dom.parent!);
        }

        const parentRect = this.dom.parent!.getBoundingClientRect();

        operation.newX = parentRect.left;
        operation.newY = parentRect.top;

        operation.newHeight = this.incPadding
            ? parentRect.height
            : parentRect.height -
              parseFloat(parentStyle!.paddingTop) -
              parseFloat(parentStyle!.paddingBottom) -
              parseFloat(parentStyle!.borderTop) -
              parseFloat(parentStyle!.borderBottom);

        operation.newWidth = this.incPadding
            ? parentRect.width
            : parentRect.width -
              parseFloat(parentStyle!.paddingLeft) -
              parseFloat(parentStyle!.paddingRight) -
              parseFloat(parentStyle!.borderLeft) -
              parseFloat(parentStyle!.borderRight);

        operation.viewportDeltaX = operation.docState!.viewportWidth - this.dom.document!.documentElement.clientWidth;
        operation.viewportDeltaY = operation.docState!.viewportHeight - this.dom.document!.documentElement.clientHeight;

        if (operation.willSort) {
            this.printSort(true, operation);
        }

        for (const target of (operation.toShow as Target[])) {
            target.hide();
        }

        for (const target of (operation.toHide as Target[])) {
            target.show();
        }

        if (operation.willChangeLayout) {
            this.dom.container!.classList.remove(operation.newContainerClassName);
            this.dom.container!.classList.add(this.config.layout.containerClassName);
        }
    }

    private getTweenData(operation: Operation): void {
        const effectNames = Object.getOwnPropertyNames(this.effectsIn!);

        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            const posData = operation.showPosData[i] as any;
            posData.posIn = createStyleData();
            posData.posOut = createStyleData();
            posData.tweenData = createStyleData();

            if (target.isShown) {
                posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
                posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
            } else {
                posData.posIn.x = posData.posIn.y = 0;
            }

            posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
            posData.posOut.y = posData.finalPosData.y - posData.interPosData.y;

            posData.posIn.opacity = target.isShown ? 1 : this.effectsIn!.opacity;
            posData.posOut.opacity = 1;
            posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity;

            if (!target.isShown && !this.config.animation.nudge) {
                posData.posIn.x = posData.posOut.x;
                posData.posIn.y = posData.posOut.y;
            }

            posData.tweenData.x = posData.posOut.x - posData.posIn.x;
            posData.tweenData.y = posData.posOut.y - posData.posIn.y;

            if (this.config.animation.animateResizeTargets) {
                posData.posIn.width = posData.startPosData.width;
                posData.posIn.height = posData.startPosData.height;

                let widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;
                posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

                let heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;
                posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;

                posData.posOut.width = posData.finalPosData.width;
                posData.posOut.height = posData.finalPosData.height;

                widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;
                posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;

                heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;
                posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;

                posData.tweenData.width = posData.posOut.width - posData.posIn.width;
                posData.tweenData.height = posData.posOut.height - posData.posIn.height;
                posData.tweenData.marginRight = posData.posOut.marginRight - posData.posIn.marginRight;
                posData.tweenData.marginBottom = posData.posOut.marginBottom - posData.posIn.marginBottom;
            }

            for (const effectName of effectNames) {
                const effect = (this.effectsIn as any)[effectName];

                if (typeof effect !== 'object' || !('value' in effect) || !effect.value) continue;

                posData.posIn[effectName].value = effect.value;
                posData.posOut[effectName].value = 0;

                posData.tweenData[effectName].value =
                    posData.posOut[effectName].value - posData.posIn[effectName].value;

                posData.posIn[effectName].unit =
                    posData.posOut[effectName].unit =
                    posData.tweenData[effectName].unit =
                    effect.unit;
            }
        }

        for (let i = 0; i < (operation.toHide as Target[]).length; i++) {
            const target = (operation.toHide as Target[])[i];
            const posData = operation.toHidePosData[i] as any;
            posData.posIn = createStyleData();
            posData.posOut = createStyleData();
            posData.tweenData = createStyleData();

            posData.posIn.x = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
            posData.posIn.y = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
            posData.posOut.x = this.config.animation.nudge ? 0 : posData.posIn.x;
            posData.posOut.y = this.config.animation.nudge ? 0 : posData.posIn.y;
            posData.tweenData.x = posData.posOut.x - posData.posIn.x;
            posData.tweenData.y = posData.posOut.y - posData.posIn.y;

            if (this.config.animation.animateResizeTargets) {
                posData.posIn.width = posData.startPosData.width;
                posData.posIn.height = posData.startPosData.height;

                const widthChange = posData.startPosData.width - posData.interPosData.width;
                posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

                const heightChange = posData.startPosData.height - posData.interPosData.height;
                posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
            }

            posData.posIn.opacity = 1;
            posData.posOut.opacity = this.effectsOut!.opacity;
            posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity;

            for (const effectName of effectNames) {
                const effect = (this.effectsOut as any)[effectName];

                if (typeof effect !== 'object' || !('value' in effect) || !effect.value) continue;

                posData.posIn[effectName].value = 0;
                posData.posOut[effectName].value = effect.value;

                posData.tweenData[effectName].value =
                    posData.posOut[effectName].value - posData.posIn[effectName].value;

                posData.posIn[effectName].unit =
                    posData.posOut[effectName].unit =
                    posData.tweenData[effectName].unit =
                    effect.unit;
            }
        }
    }

    private moveTargets(operation: Operation): void {
        const checkProgress = this.checkProgress.bind(this);
        let staggerIndex = -1;

        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            const posData = operation.showPosData[i] as any;
            const moveData = createMoveData();

            const statusChange = target.isShown ? 'none' : 'show';
            const willTransition = this.willTransition(
                statusChange,
                operation.hasEffect,
                posData.posIn,
                posData.posOut
            );

            if (willTransition) {
                staggerIndex++;
            }

            target.show();

            moveData.posIn = posData.posIn;
            moveData.posOut = posData.posOut;
            moveData.statusChange = statusChange;
            moveData.staggerIndex = staggerIndex;
            moveData.operation = operation;
            moveData.callback = willTransition ? checkProgress : null;

            target.move(moveData);
        }

        for (let i = 0; i < (operation.toHide as Target[]).length; i++) {
            const target = (operation.toHide as Target[])[i];
            const posData = operation.toHidePosData[i] as any;
            const moveData = createMoveData();

            const willTransition = this.willTransition('hide', posData.posIn, posData.posOut);

            moveData.posIn = posData.posIn;
            moveData.posOut = posData.posOut;
            moveData.statusChange = 'hide';
            moveData.staggerIndex = i;
            moveData.operation = operation;
            moveData.callback = willTransition ? checkProgress : null;

            target.move(moveData);
        }

        if (this.config.animation.animateResizeContainer) {
            this.dom.parent!.style.transition =
                'height ' + this.config.animation.duration + 'ms ease, ' +
                'width ' + this.config.animation.duration + 'ms ease ';

            requestAnimationFrame(() => {
                if (
                    operation.startHeight !== operation.newHeight &&
                    operation.viewportDeltaY !== operation.startHeight - operation.newHeight
                ) {
                    this.dom.parent!.style.height = operation.newHeight + 'px';
                }

                if (
                    operation.startWidth !== operation.newWidth &&
                    operation.viewportDeltaX !== operation.startWidth - operation.newWidth
                ) {
                    this.dom.parent!.style.width = operation.newWidth + 'px';
                }
            });
        }

        if (operation.willChangeLayout) {
            this.dom.container!.classList.remove(this.config.layout.containerClassName);
            this.dom.container!.classList.add(operation.newContainerClassName);
        }
    }

    private hasEffect(): boolean {
        const EFFECTABLES = [
            'scale', 'translateX', 'translateY', 'translateZ',
            'rotateX', 'rotateY', 'rotateZ',
        ];

        if (this.effectsIn!.opacity !== 1) return true;

        for (const effectName of EFFECTABLES) {
            const effect = (this.effectsIn as any)[effectName];
            const value = (typeof effect === 'object' && effect && effect.value !== undefined) ? effect.value : effect;

            if (value !== 0) return true;
        }

        return false;
    }

    private willTransition(
        statusChange: string,
        hasEffectOrPosIn: boolean | StyleData,
        posIn: StyleData,
        posOut?: StyleData
    ): boolean {
        // Handle two possible call signatures:
        // willTransition(statusChange, hasEffect, posIn, posOut)
        // willTransition(statusChange, posIn, posOut) — for toHide
        let hasEffectVal: boolean;
        let actualPosIn: StyleData;
        let actualPosOut: StyleData;

        if (posOut !== undefined) {
            hasEffectVal = hasEffectOrPosIn as boolean;
            actualPosIn = posIn;
            actualPosOut = posOut;
        } else {
            hasEffectVal = true;
            actualPosIn = hasEffectOrPosIn as StyleData;
            actualPosOut = posIn;
        }

        if (!isVisible(this.dom.container!)) {
            return false;
        } else if (
            (statusChange !== 'none' && hasEffectVal) ||
            actualPosIn.x !== actualPosOut.x ||
            actualPosIn.y !== actualPosOut.y
        ) {
            return true;
        } else if (this.config.animation.animateResizeTargets) {
            return (
                actualPosIn.width !== actualPosOut.width ||
                actualPosIn.height !== actualPosOut.height ||
                actualPosIn.marginRight !== actualPosOut.marginRight ||
                actualPosIn.marginBottom !== actualPosOut.marginBottom
            );
        }

        return false;
    }

    private checkProgress(_target?: unknown, operation?: unknown): void {
        this.targetsDone++;

        if (this.targetsBound === this.targetsDone) {
            this.cleanUp(operation as Operation);
        }
    }

    private cleanUp(operation: Operation): void {
        this.targetsMoved =
            this.targetsImmovable =
            this.targetsBound =
            this.targetsDone = 0;

        for (const target of (operation.show as Target[])) {
            target.cleanUp();
            target.show();
        }

        for (const target of (operation.toHide as Target[])) {
            target.cleanUp();
            target.hide();
        }

        if (operation.willSort) {
            this.printSort(false, operation);
        }

        // Remove parent container styles
        this.dom.parent!.style.transition = '';
        this.dom.parent!.style.height = '';
        this.dom.parent!.style.width = '';
        this.dom.parent!.style.overflow = '';
        (this.dom.parent! as any).style.perspective = '';
        (this.dom.parent! as any).style.perspectiveOrigin = '';

        if (operation.willChangeLayout) {
            this.dom.container!.classList.remove(operation.startContainerClassName);
            this.dom.container!.classList.add(operation.newContainerClassName);
        }

        if ((operation.toRemove as Target[]).length) {
            for (let i = 0; i < this.targets.length; i++) {
                const target = this.targets[i];

                if ((operation.toRemove as Target[]).indexOf(target) > -1) {
                    const whitespaceBefore = target.dom.el!.previousSibling;
                    const whitespaceAfter = target.dom.el!.nextSibling;

                    if (
                        whitespaceBefore && whitespaceBefore.nodeName === '#text' &&
                        whitespaceAfter && whitespaceAfter.nodeName === '#text'
                    ) {
                        removeWhitespace(whitespaceBefore);
                    }

                    if (!operation.willSort) {
                        this.dom.parent!.removeChild(target.dom.el!);
                    }

                    this.targets.splice(i, 1);
                    target.isInDom = false;
                    i--;
                }
            }

            this.origOrder = this.targets;
        }

        if (operation.willSort) {
            this.targets = operation.newOrder as Target[];
        }

        this.state = operation.newState;
        this.lastOperation = operation;
        this.dom.targets = this.state!.targets;

        fire('mixEnd', this.dom.container!, {
            state: this.state as MixitupState,
            instance: this,
        }, this.dom.document!);

        if (typeof this.config.callbacks.onMixEnd === 'function') {
            this.config.callbacks.onMixEnd.call(this.dom.container, this.state as MixitupState, this);
        }

        if (operation.hasFailed) {
            fire('mixFail', this.dom.container!, {
                state: this.state as MixitupState,
                instance: this,
            }, this.dom.document!);

            if (typeof this.config.callbacks.onMixFail === 'function') {
                this.config.callbacks.onMixFail.call(this.dom.container, this.state as MixitupState, this);
            }

            this.dom.container!.classList.add(
                getClassname(this.config.classNames, 'container', this.config.classNames.modifierFailed)
            );
        }

        if (typeof this.userCallback === 'function') {
            this.userCallback.call(this.dom.container, this.state, this);
        }

        if (this.userDeferred && typeof this.userDeferred.resolve === 'function') {
            this.userDeferred.resolve(this.state);
        }

        this.userCallback = null;
        this.userDeferred = null;
        this.lastClicked = null;
        this.isToggling = false;
        this.isBusy = false;

        if (this.queue.length) {
            const nextInQueue = this.queue.shift()!;

            this.userDeferred = nextInQueue.deferred;
            this.isToggling = nextInQueue.isToggling;
            this.lastClicked = nextInQueue.triggerElement;

            if (
                nextInQueue.instruction &&
                nextInQueue.instruction.command &&
                (nextInQueue.instruction.command as any).filter !== undefined
            ) {
                this.multimix(...(nextInQueue.args as [any]));
            } else {
                this.dataset(...(nextInQueue.args as [any]));
            }
        }
    }

    private parseMultimixArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandMultimix();

        for (const arg of args) {
            if (arg === null) continue;

            if (typeof arg === 'object') {
                extend(instruction.command as Record<string, any>, arg);
            } else if (typeof arg === 'boolean') {
                instruction.animate = arg;
            } else if (typeof arg === 'function') {
                instruction.callback = arg;
            }
        }

        const cmd = instruction.command as any;

        if (cmd.insert && typeof cmd.insert === 'object' && !cmd.insert.collection) {
            cmd.insert = this.parseInsertArgs([cmd.insert]).command;
        }

        if (cmd.remove && typeof cmd.remove === 'object' && !cmd.remove.targets) {
            cmd.remove = this.parseRemoveArgs([cmd.remove]).command;
        }

        if (cmd.filter && typeof cmd.filter !== 'object') {
            cmd.filter = this.parseFilterArgs([cmd.filter]).command;
        }

        if (cmd.sort && typeof cmd.sort !== 'object') {
            cmd.sort = this.parseSortArgs([cmd.sort]).command;
        }

        if (cmd.changeLayout && typeof cmd.changeLayout !== 'object') {
            cmd.changeLayout = this.parseChangeLayoutArgs([cmd.changeLayout]).command;
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseFilterArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandFilter();

        const cmd = instruction.command as CommandFilter;

        for (const arg of args) {
            if (typeof arg === 'string') {
                cmd.selector = arg;
            } else if (arg === null) {
                cmd.collection = [];
            } else if (typeof arg === 'object' && isElement(arg, this.dom.document!)) {
                cmd.collection = [arg];
            } else if (typeof arg === 'object' && typeof arg.length !== 'undefined') {
                cmd.collection = Array.from(arg);
            } else if (typeof arg === 'object') {
                extend(cmd as any, arg);
            } else if (typeof arg === 'boolean') {
                instruction.animate = arg;
            } else if (typeof arg === 'function') {
                instruction.callback = arg;
            }
        }

        if (cmd.selector && cmd.collection) {
            throw new Error((messages.errorFilterInvalidArguments as Function)());
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseSortArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandSort();

        let sortString = '';

        for (const arg of args) {
            if (arg === null) continue;

            switch (typeof arg) {
                case 'string':
                    sortString = arg;
                    break;
                case 'object':
                    if (arg.length) {
                        (instruction.command as CommandSort).collection = Array.from(arg);
                    }
                    break;
                case 'boolean':
                    instruction.animate = arg;
                    break;
                case 'function':
                    instruction.callback = arg;
                    break;
            }
        }

        if (sortString) {
            instruction.command = this.parseSortString(sortString, instruction.command as CommandSort);
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseInsertArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandInsert();

        const cmd = instruction.command as CommandInsert;

        for (const arg of args) {
            if (arg === null) continue;

            if (typeof arg === 'number') {
                cmd.index = arg;
            } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
                cmd.position = arg as 'before' | 'after';
            } else if (typeof arg === 'string') {
                cmd.collection = Array.from(createElement(arg).childNodes) as Element[];
            } else if (typeof arg === 'object' && isElement(arg, this.dom.document!)) {
                if (!cmd.collection.length) {
                    cmd.collection = [arg];
                } else {
                    cmd.sibling = arg;
                }
            } else if (typeof arg === 'object' && arg.length) {
                if (!cmd.collection.length) {
                    cmd.collection = Array.from(arg);
                } else {
                    cmd.sibling = arg[0];
                }
            } else if (typeof arg === 'object' && arg.childNodes && arg.childNodes.length) {
                if (!cmd.collection.length) {
                    cmd.collection = Array.from(arg.childNodes);
                } else {
                    cmd.sibling = arg.childNodes[0];
                }
            } else if (typeof arg === 'object') {
                extend(cmd as any, arg);
            } else if (typeof arg === 'boolean') {
                instruction.animate = arg;
            } else if (typeof arg === 'function') {
                instruction.callback = arg;
            }
        }

        if (cmd.index && cmd.sibling) {
            throw new Error((messages.errorInsertInvalidArguments as Function)());
        }

        if (!cmd.collection.length && this.config.debug.showWarnings) {
            console.warn((messages.warningInsertNoElements as Function)());
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseRemoveArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandRemove();

        const cmd = instruction.command as CommandRemove;

        for (const arg of args) {
            if (arg === null) continue;

            switch (typeof arg) {
                case 'number':
                    if (this.targets[arg]) {
                        cmd.targets[0] = this.targets[arg] as any;
                    }
                    break;
                case 'string':
                    cmd.collection = Array.from(this.dom.parent!.querySelectorAll(arg));
                    break;
                case 'object':
                    if (arg && arg.length) {
                        cmd.collection = Array.from(arg);
                    } else if (isElement(arg, this.dom.document!)) {
                        cmd.collection = [arg];
                    } else {
                        extend(cmd as any, arg);
                    }
                    break;
                case 'boolean':
                    instruction.animate = arg;
                    break;
                case 'function':
                    instruction.callback = arg;
                    break;
            }
        }

        if (cmd.collection.length) {
            for (const target of this.targets) {
                if (cmd.collection.indexOf(target.dom.el!) > -1) {
                    cmd.targets.push(target as any);
                }
            }
        }

        if (!cmd.targets.length && this.config.debug.showWarnings) {
            console.warn((messages.warningRemoveNoElements as Function)());
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseDatasetArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandDataset();

        for (const arg of args) {
            if (arg === null) continue;

            switch (typeof arg) {
                case 'object':
                    if (Array.isArray(arg) || typeof arg.length === 'number') {
                        (instruction.command as CommandDataset).dataset = arg;
                    } else {
                        extend(instruction.command as any, arg);
                    }
                    break;
                case 'boolean':
                    instruction.animate = arg;
                    break;
                case 'function':
                    instruction.callback = arg;
                    break;
            }
        }

        Object.freeze(instruction);

        return instruction;
    }

    private parseChangeLayoutArgs(args: any[]): UserInstruction {
        const instruction = createUserInstruction();

        instruction.animate = this.config.animation.enable;
        instruction.command = createCommandChangeLayout();

        for (const arg of args) {
            if (arg === null) continue;

            switch (typeof arg) {
                case 'string':
                    (instruction.command as CommandChangeLayout).containerClassName = arg;
                    break;
                case 'object':
                    extend(instruction.command as any, arg);
                    break;
                case 'boolean':
                    instruction.animate = arg;
                    break;
                case 'function':
                    instruction.callback = arg;
                    break;
            }
        }

        Object.freeze(instruction);

        return instruction;
    }

    private queueMix(queueItem: QueueItem): Promise<MixitupState> {
        const deferred = this.createDeferred();

        if (this.config.animation.queue && this.queue.length < this.config.animation.queueLimit) {
            queueItem.deferred = deferred;

            this.queue.push(queueItem);

            if (this.config.controls.enable) {
                if (this.isToggling) {
                    this.buildToggleArray(queueItem.instruction!.command);

                    const toggleSelector = this.getToggleSelector();

                    this.updateControls({
                        filter: { selector: toggleSelector },
                    });
                } else {
                    this.updateControls(queueItem.instruction!.command);
                }
            }
        } else {
            if (this.config.debug.showWarnings) {
                console.warn((messages.warningMultimixInstanceQueueFull as Function)());
            }

            deferred.resolve(this.state);

            fire('mixBusy', this.dom.container!, {
                state: this.state as MixitupState,
                instance: this,
            }, this.dom.document!);

            if (typeof this.config.callbacks.onMixBusy === 'function') {
                this.config.callbacks.onMixBusy.call(this.dom.container, this.state as MixitupState, this);
            }
        }

        return deferred.promise;
    }

    private getDataOperation(newDataset: Array<Record<string, unknown>>): Operation {
        const operation = createOperation();
        let startDataset: Array<Record<string, unknown>> = [];

        if (this.dom.targets.length && !(startDataset = (this.state!.activeDataset || [])).length) {
            throw new Error((messages.errorDatasetNotSet as Function)());
        }

        operation.id = randomHex();
        operation.startState = this.state;
        operation.startDataset = startDataset;
        operation.newDataset = newDataset.slice();

        this.diffDatasets(operation);

        operation.startOrder = this.targets as any;
        operation.newOrder = operation.show;

        if (this.config.animation.enable) {
            this.getStartMixData(operation);
            this.setInter(operation);

            operation.docState = getDocumentState(this.dom.document!);

            this.getInterMixData(operation);
            this.setFinal(operation);
            this.getFinalMixData(operation);

            this.parseEffects();

            operation.hasEffect = this.hasEffect();

            this.getTweenData(operation);
        }

        this.targets = (operation.show as Target[]).slice();

        operation.newState = this.buildState(operation);

        Array.prototype.push.apply(this.targets, operation.toRemove as Target[]);

        return operation;
    }

    private diffDatasets(operation: Operation): void {
        const persistantStartIds: string[] = [];
        const persistantNewIds: string[] = [];
        const insertedTargets: Target[] = [];
        const uids: Record<string, boolean> = {};
        let frag: DocumentFragment | null = null;
        let nextEl: Element | null = null;

        for (const data of operation.newDataset!) {
            const id = data[this.config.data.uidKey] as string;

            if (typeof id === 'undefined' || id.toString().length < 1) {
                throw new TypeError((messages.errorDatasetInvalidUidKey as Function)({
                    uidKey: this.config.data.uidKey,
                }));
            }

            if (!uids[id]) {
                uids[id] = true;
            } else {
                throw new Error((messages.errorDatasetDuplicateUid as Function)({
                    uid: id,
                }));
            }

            let target = this.cache[id];

            if (target instanceof Target) {
                if (this.config.data.dirtyCheck && !deepEquals(data, target.data)) {
                    const el = target.render(data);

                    target.data = data;

                    if (el !== target.dom.el) {
                        if (target.isInDom) {
                            target.unbindEvents();
                            this.dom.parent!.replaceChild(el, target.dom.el!);
                        }

                        if (!target.isShown) {
                            (el as HTMLElement).style.display = 'none';
                        }

                        target.dom.el = el;

                        if (target.isInDom) {
                            target.bindEvents();
                        }
                    }
                }
            } else {
                target = new Target();
                target.init(null, this, data);
                target.hide();
            }

            if (!target.isInDom) {
                if (!frag) {
                    frag = this.dom.document!.createDocumentFragment();
                }

                if (frag.lastElementChild) {
                    frag.appendChild(this.dom.document!.createTextNode(' '));
                }

                frag.appendChild(target.dom.el!);

                target.isInDom = true;
                target.unbindEvents();
                target.bindEvents();
                target.hide();

                (operation.toShow as Target[]).push(target);
                insertedTargets.push(target);
            } else {
                nextEl = target.dom.el!.nextElementSibling;
                persistantNewIds.push(id);

                if (frag) {
                    if (frag.lastElementChild) {
                        frag.appendChild(this.dom.document!.createTextNode(' '));
                    }

                    this.insertDatasetFrag(frag, target.dom.el!, insertedTargets);
                    frag = null;
                }
            }

            (operation.show as Target[]).push(target);
        }

        if (frag) {
            nextEl = nextEl || (this.config.layout.siblingAfter as Element | null);

            if (nextEl) {
                frag.appendChild(this.dom.document!.createTextNode(' '));
            }

            this.insertDatasetFrag(frag, nextEl, insertedTargets);
        }

        for (const data of operation.startDataset!) {
            const id = data[this.config.data.uidKey] as string;
            const target = this.cache[id];

            if ((operation.show as Target[]).indexOf(target) < 0) {
                (operation.hide as Target[]).push(target);
                (operation.toHide as Target[]).push(target);
                (operation.toRemove as Target[]).push(target);
            } else {
                persistantStartIds.push(id);
            }
        }

        if (!isEqualArray(persistantStartIds, persistantNewIds)) {
            operation.willSort = true;
        }
    }

    private insertDatasetFrag(frag: DocumentFragment, nextEl: Element | null, targets: Target[]): void {
        const insertAt = nextEl
            ? Array.from(this.dom.parent!.children).indexOf(nextEl as Element)
            : this.targets.length;

        this.dom.parent!.insertBefore(frag, nextEl);

        let currentIdx = insertAt;
        while (targets.length) {
            this.targets.splice(currentIdx, 0, targets.shift()!);
            currentIdx++;
        }
    }

    private willSortCheck(sortCommandA: CommandSort, sortCommandB: CommandSort): boolean {
        if (
            this.config.behavior.liveSort ||
            sortCommandA.order === 'random' ||
            sortCommandA.attribute !== sortCommandB.attribute ||
            sortCommandA.order !== sortCommandB.order ||
            sortCommandA.collection !== sortCommandB.collection ||
            (sortCommandA.next === null && sortCommandB.next) ||
            (sortCommandA.next && sortCommandB.next === null)
        ) {
            return true;
        } else if (sortCommandA.next && sortCommandB.next) {
            return this.willSortCheck(sortCommandA.next, sortCommandB.next);
        }

        return false;
    }

    // Public API methods

    show(): Promise<MixitupState> {
        return this.filter('all');
    }

    hide(): Promise<MixitupState> {
        return this.filter('none');
    }

    isMixing(): boolean {
        return this.isBusy;
    }

    filter(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseFilterArgs(args);

        return this.multimix({
            filter: instruction.command as CommandFilter,
        }, instruction.animate, instruction.callback);
    }

    toggleOn(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseFilterArgs(args);
        const selector = (instruction.command as CommandFilter).selector;

        this.isToggling = true;

        if (this.toggleArray.indexOf(selector) < 0) {
            this.toggleArray.push(selector);
        }

        const toggleSelector = this.getToggleSelector();

        return this.multimix({
            filter: toggleSelector as any,
        }, instruction.animate, instruction.callback);
    }

    toggleOff(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseFilterArgs(args);
        const selector = (instruction.command as CommandFilter).selector;
        const selectorIndex = this.toggleArray.indexOf(selector);

        this.isToggling = true;

        if (selectorIndex > -1) {
            this.toggleArray.splice(selectorIndex, 1);
        }

        const toggleSelector = this.getToggleSelector();

        return this.multimix({
            filter: toggleSelector as any,
        }, instruction.animate, instruction.callback);
    }

    sort(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseSortArgs(args);

        return this.multimix({
            sort: instruction.command as CommandSort,
        }, instruction.animate, instruction.callback);
    }

    changeLayout(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseChangeLayoutArgs(args);

        return this.multimix({
            changeLayout: instruction.command as CommandChangeLayout,
        }, instruction.animate, instruction.callback);
    }

    multimix(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseMultimixArgs(args);

        if (!this.isBusy) {
            const operation = this.getOperation(instruction.command as Partial<CommandMultimix>);

            if (!operation) {
                return Promise.resolve(this.state as MixitupState);
            }

            if (this.config.controls.enable) {
                if ((instruction.command as any).filter && !this.isToggling) {
                    this.toggleArray.length = 0;
                    this.buildToggleArray(operation.command);
                }

                if (this.queue.length < 1) {
                    this.updateControls(operation.command);
                }
            }

            if (instruction.callback) this.userCallback = instruction.callback;

            const animate = (instruction.animate as any ^ this.config.animation.enable as any)
                ? instruction.animate
                : this.config.animation.enable;

            return this.goMix(animate, operation);
        } else {
            const queueItem = createQueueItem();

            queueItem.args = args;
            queueItem.instruction = instruction;
            queueItem.triggerElement = this.lastClicked;
            queueItem.isToggling = this.isToggling;

            return this.queueMix(queueItem);
        }
    }

    dataset(...args: any[]): Promise<MixitupState> {
        const instruction = this.parseDatasetArgs(args);

        if (!this.isBusy) {
            if (instruction.callback) this.userCallback = instruction.callback;

            const animate = (instruction.animate as any ^ this.config.animation.enable as any)
                ? instruction.animate
                : this.config.animation.enable;

            const operation = this.getDataOperation((instruction.command as CommandDataset).dataset!);

            return this.goMix(animate, operation);
        } else {
            const queueItem = createQueueItem();

            queueItem.args = args;
            queueItem.instruction = instruction;

            return this.queueMix(queueItem);
        }
    }

    getOperation(multimixCommand: Partial<CommandMultimix>): Operation | null {
        const sortCommand = multimixCommand.sort;
        const filterCommand = multimixCommand.filter;
        const changeLayoutCommand = multimixCommand.changeLayout;
        const removeCommand = multimixCommand.remove;
        const insertCommand = multimixCommand.insert;
        const operation = createOperation();

        operation.id = randomHex();
        operation.command = multimixCommand as CommandMultimix;
        operation.startState = this.state;
        operation.triggerElement = this.lastClicked;

        if (this.isBusy) {
            if (this.config.debug.showWarnings) {
                console.warn((messages.warningGetOperationInstanceBusy as Function)());
            }
            return null;
        }

        if (insertCommand) {
            this.insertTargets(insertCommand, operation);
        }

        if (removeCommand) {
            operation.toRemove = removeCommand.targets;
        }

        operation.startSort = operation.newSort = this.state!.activeSort as CommandSort;
        operation.startOrder = operation.newOrder = this.targets as any;

        if (sortCommand) {
            operation.startSort = this.state!.activeSort as CommandSort;
            operation.newSort = sortCommand;

            operation.willSort = this.willSortCheck(sortCommand, this.state!.activeSort as CommandSort);

            if (operation.willSort) {
                this.sortOperation(operation);
            }
        }

        operation.startFilter = this.state!.activeFilter as CommandFilter;

        if (filterCommand) {
            operation.newFilter = filterCommand;
        } else {
            operation.newFilter = { ...operation.startFilter! };
        }

        if (operation.newFilter!.selector === 'all') {
            operation.newFilter!.selector = this.config.selectors.target;
        } else if (operation.newFilter!.selector === 'none') {
            operation.newFilter!.selector = '';
        }

        this.filterOperation(operation);

        operation.startContainerClassName = this.state!.activeContainerClassName;

        if (changeLayoutCommand) {
            operation.newContainerClassName = changeLayoutCommand.containerClassName;

            if (operation.newContainerClassName !== operation.startContainerClassName) {
                operation.willChangeLayout = true;
            }
        } else {
            operation.newContainerClassName = operation.startContainerClassName;
        }

        if (this.config.animation.enable) {
            this.getStartMixData(operation);
            this.setInter(operation);

            operation.docState = getDocumentState(this.dom.document!);

            this.getInterMixData(operation);
            this.setFinal(operation);
            this.getFinalMixData(operation);

            this.parseEffects();

            operation.hasEffect = this.hasEffect();

            this.getTweenData(operation);
        }

        if (operation.willSort) {
            this.targets = operation.newOrder as Target[];
        }

        operation.newState = this.buildState(operation);

        return operation;
    }

    tween(operation: any, multiplier: number): void {
        multiplier = Math.min(multiplier, 1);
        multiplier = Math.max(multiplier, 0);

        for (let i = 0; i < (operation.show as Target[]).length; i++) {
            const target = (operation.show as Target[])[i];
            const posData = operation.showPosData[i];

            target.applyTween(posData, multiplier);
        }

        for (let i = 0; i < (operation.hide as Target[]).length; i++) {
            const target = (operation.hide as Target[])[i];

            if (target.isShown) {
                target.hide();
            }

            const toHideIndex = (operation.toHide as Target[]).indexOf(target);

            if (toHideIndex > -1) {
                const posData = operation.toHidePosData[toHideIndex];

                if (!target.isShown) {
                    target.show();
                }

                target.applyTween(posData, multiplier);
            }
        }
    }

    insert(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseInsertArgs(args);

        return this.multimix({
            insert: parsed.command as CommandInsert,
        }, parsed.animate, parsed.callback);
    }

    insertBefore(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseInsertArgs(args);
        const cmd = parsed.command as CommandInsert;

        return this.insert(cmd.collection, 'before', cmd.sibling, parsed.animate, parsed.callback);
    }

    insertAfter(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseInsertArgs(args);
        const cmd = parsed.command as CommandInsert;

        return this.insert(cmd.collection, 'after', cmd.sibling, parsed.animate, parsed.callback);
    }

    prepend(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseInsertArgs(args);
        const cmd = parsed.command as CommandInsert;

        return this.insert(0, cmd.collection, parsed.animate, parsed.callback);
    }

    append(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseInsertArgs(args);
        const cmd = parsed.command as CommandInsert;

        return this.insert(this.state!.totalTargets, cmd.collection, parsed.animate, parsed.callback);
    }

    remove(...args: any[]): Promise<MixitupState> {
        const parsed = this.parseRemoveArgs(args);

        return this.multimix({
            remove: parsed.command as CommandRemove,
        }, parsed.animate, parsed.callback);
    }

    getConfig(stringKey?: string): MixitupConfig | unknown {
        if (!stringKey) {
            return this.config;
        }

        return getProperty(this.config, stringKey);
    }

    configure(config: Partial<MixitupConfig>): void {
        extend(this.config as any, config as any, true, true);
    }

    getState(): MixitupState {
        const state = { ...this.state! };

        Object.freeze(state);

        return state;
    }

    forceRefresh(): void {
        this.indexTargets();
    }

    forceRender(): void {
        for (const id in this.cache) {
            const target = this.cache[id];
            const el = target.render(target.data!);

            if (el !== target.dom.el) {
                if (target.isInDom) {
                    target.unbindEvents();
                    this.dom.parent!.replaceChild(el, target.dom.el!);
                }

                if (!target.isShown) {
                    (el as HTMLElement).style.display = 'none';
                }

                target.dom.el = el;

                if (target.isInDom) {
                    target.bindEvents();
                }
            }
        }

        this.state = this.buildState(this.lastOperation!);
    }

    destroy(cleanUp: boolean = false): void {
        for (const control of this.controls) {
            control.removeBinding(this);
        }

        for (const target of this.targets) {
            if (cleanUp) {
                target.show();
            }

            target.unbindEvents();
        }

        if (this.dom.container!.id.match(/^MixItUp/)) {
            this.dom.container!.removeAttribute('id');
        }

        instances.delete(this.id);
    }
}
