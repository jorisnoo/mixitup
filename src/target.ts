import type { TargetDom } from './types/dom';
import type { StyleData, TransformData, IMoveData } from './types/style-data';
import type { Operation } from './operation';
import { features } from './features';
import { isElement } from './helpers';
import { messages } from './messages';

export class Target {
    id: string = '';
    sortString: string | number = '';
    mixer: any = null;
    callback: ((target: Target, operation: Operation) => void) | null = null;
    isShown: boolean = false;
    isBound: boolean = false;
    isInDom: boolean = false;
    handler: ((e: Event) => void) | null = null;
    operation: Operation | null = null;
    data: Record<string, unknown> | null = null;
    dom: TargetDom = { el: null };

    init(el: Element | null, mixer: any, data?: Record<string, unknown>): void {
        this.mixer = mixer;

        if (!el) {
            el = this.render(data!);
        }

        this.cacheDom(el!);
        this.bindEvents();

        if ((this.dom.el as HTMLElement).style.display !== 'none') {
            this.isShown = true;
        }

        if (data && mixer.config.data.uidKey) {
            const id = data[mixer.config.data.uidKey];

            if (id == null || String(id).length < 1) {
                throw new TypeError(
                    (messages.errorDatasetInvalidUidKey as Function)({
                        uidKey: mixer.config.data.uidKey,
                    })
                );
            }

            this.id = String(id);
            this.data = data;

            mixer.cache[this.id] = this;
        }
    }

    render(data: Record<string, unknown>): Element {
        const render = this.mixer.config.render.target;

        if (typeof render !== 'function') {
            throw new TypeError(
                (messages.errorDatasetRendererNotSet as Function)()
            );
        }

        const output = render(data);

        if (output && typeof output === 'object' && isElement(output, this.mixer.dom.document)) {
            return output as Element;
        } else if (typeof output === 'string') {
            const temp = this.mixer.dom.document.createElement('div');
            temp.innerHTML = output;

            return temp.firstElementChild!;
        }

        return output as Element;
    }

    cacheDom(el: Element): void {
        this.dom.el = el;
    }

    getSortString(attributeName: string): void {
        const value = this.dom.el!.getAttribute('data-' + attributeName) || '';

        const numericValue = Number(value);

        this.sortString = isNaN(numericValue) ? value.toLowerCase() : numericValue;
    }

    show(): void {
        if (!this.isShown) {
            (this.dom.el as HTMLElement).style.display = '';

            this.isShown = true;
        }
    }

    hide(): void {
        if (this.isShown) {
            (this.dom.el as HTMLElement).style.display = 'none';

            this.isShown = false;
        }
    }

    applyTween(posData: IMoveData, multiplier: number): void {
        const posIn = posData.posIn!;
        const currentTransformValues: string[] = [];
        const currentValues: Record<string, any> = {
            x: posIn.x,
            y: posIn.y,
        };

        if (multiplier === 0) {
            this.hide();
        } else if (!this.isShown) {
            this.show();
        }

        for (const propertyName of features.TWEENABLE) {
            const tweenData = posData.tweenData[propertyName];

            if (propertyName === 'x') {
                if (!tweenData) continue;

                currentValues.x = posIn.x + (tweenData * multiplier);
            } else if (propertyName === 'y') {
                if (!tweenData) continue;

                currentValues.y = posIn.y + (tweenData * multiplier);
            } else if (tweenData && typeof tweenData === 'object' && 'value' in tweenData) {
                if (!tweenData.value) continue;

                const posInTransform = (posIn as any)[propertyName] as TransformData;

                currentValues[propertyName] = {
                    value: posInTransform.value + (tweenData.value * multiplier),
                    unit: tweenData.unit,
                };

                currentTransformValues.push(
                    propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')'
                );
            } else {
                if (!tweenData) continue;

                currentValues[propertyName] = (posIn as any)[propertyName] + (tweenData * multiplier);

                (this.dom.el as HTMLElement).style[propertyName as any] = currentValues[propertyName];
            }
        }

        if (currentValues.x || currentValues.y) {
            currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
        }

        if (currentTransformValues.length) {
            (this.dom.el as HTMLElement).style.transform = currentTransformValues.join(' ');
        }
    }

    applyStylesIn(moveData: IMoveData): void {
        const posIn = moveData.posIn!;
        const el = this.dom.el as HTMLElement;
        const isFading = this.mixer.effectsIn.opacity !== 1;
        let transformValues: string[] = [];

        transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

        if (this.mixer.config.animation.animateResizeTargets) {
            if (moveData.statusChange !== 'show') {
                el.style.width = posIn.width + 'px';
                el.style.height = posIn.height + 'px';
            }

            el.style.marginRight = posIn.marginRight + 'px';
            el.style.marginBottom = posIn.marginBottom + 'px';
        }

        if (isFading) {
            el.style.opacity = String(posIn.opacity);
        }

        if (moveData.statusChange === 'show') {
            transformValues = transformValues.concat(this.mixer.transformIn);
        }

        el.style.transform = transformValues.join(' ');
    }

    applyStylesOut(moveData: IMoveData, delay: number): number {
        const transitionRules: string[] = [];
        let transformValues: string[] = [];
        const isResizing = this.mixer.config.animation.animateResizeTargets;
        const isFading = typeof this.mixer.effectsIn.opacity !== 'undefined';
        const el = this.dom.el as HTMLElement;

        transitionRules.push(this.writeTransitionRule(
            features.transformRule,
            delay
        ));

        if (moveData.statusChange !== 'none') {
            transitionRules.push(this.writeTransitionRule(
                'opacity',
                delay,
                moveData.duration
            ));
        }

        if (isResizing) {
            transitionRules.push(this.writeTransitionRule(
                'width',
                delay,
                moveData.duration
            ));

            transitionRules.push(this.writeTransitionRule(
                'height',
                delay,
                moveData.duration
            ));

            transitionRules.push(this.writeTransitionRule(
                'margin',
                delay,
                moveData.duration
            ));
        }

        this.operation = moveData.operation as Operation;
        this.callback = moveData.callback as (target: Target, operation: Operation) => void;

        this.mixer.targetsBound++;

        this.isBound = true;

        this.applyTransition(transitionRules);

        const posOut = moveData.posOut!;

        if (isResizing && posOut.width > 0 && posOut.height > 0) {
            el.style.width = posOut.width + 'px';
            el.style.height = posOut.height + 'px';
            el.style.marginRight = posOut.marginRight + 'px';
            el.style.marginBottom = posOut.marginBottom + 'px';
        }

        if (!this.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
            transformValues.push('translate(' + posOut.x + 'px, ' + posOut.y + 'px)');
        }

        switch (moveData.statusChange) {
            case 'hide':
                if (isFading) {
                    el.style.opacity = String(this.mixer.effectsOut.opacity);
                }

                transformValues = transformValues.concat(this.mixer.transformOut);

                break;
            case 'show':
                if (isFading) {
                    el.style.opacity = '1';
                }
        }

        if (
            this.mixer.config.animation.nudge ||
            (!this.mixer.config.animation.nudge && moveData.statusChange !== 'hide')
        ) {
            transformValues.push('translate(' + posOut.x + 'px, ' + posOut.y + 'px)');
        }

        el.style.transform = transformValues.join(' ');

        return delay + Math.max(this.mixer.config.animation.duration, moveData.duration);
    }

    private writeTransitionRule(property: string, delay: number, duration?: number): string {
        return property + ' ' +
            (duration && duration > 0 ? duration : this.mixer.config.animation.duration) + 'ms ' +
            delay + 'ms ' +
            (property === 'opacity' ? 'linear' : this.mixer.config.animation.easing);
    }

    getDelay(index: number): number {
        let adjustedIndex = index;

        if (typeof this.mixer.config.animation.staggerSequence === 'function') {
            adjustedIndex = this.mixer.config.animation.staggerSequence.call(this, index, this.mixer.state);
        }

        return this.mixer.staggerDuration ? adjustedIndex * this.mixer.staggerDuration : 0;
    }

    applyTransition(rules: string[]): void {
        (this.dom.el as HTMLElement).style.transition = rules.join(', ');
    }

    handleTransitionEnd(e: TransitionEvent): void {
        const propName = e.propertyName;
        const canResize = this.mixer.config.animation.animateResizeTargets;

        if (
            this.isBound &&
            e.target === this.dom.el &&
            (
                propName.indexOf('transform') > -1 ||
                propName.indexOf('opacity') > -1 ||
                (canResize && propName.indexOf('height') > -1) ||
                (canResize && propName.indexOf('width') > -1) ||
                (canResize && propName.indexOf('margin') > -1)
            )
        ) {
            const callback = this.callback!;
            const operation = this.operation!;
            this.isBound = false;
            this.callback = null;
            this.operation = null;
            callback(this, operation);
        }
    }

    bindEvents(): void {
        this.handler = (e: Event) => {
            this.handleTransitionEnd(e as TransitionEvent);
        };

        this.dom.el!.addEventListener('transitionend', this.handler);
        this.dom.el!.addEventListener('transitioncancel', this.handler);
    }

    unbindEvents(): void {
        if (this.handler) {
            this.dom.el!.removeEventListener('transitionend', this.handler);
            this.dom.el!.removeEventListener('transitioncancel', this.handler);
            this.handler = null;
        }
    }

    getPosData(getBox?: boolean): StyleData {
        const el = this.dom.el as HTMLElement;
        const posData: StyleData = {
            x: el.offsetLeft,
            y: el.offsetTop,
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

        if (this.mixer.config.animation.animateResizeTargets || getBox) {
            const rect = el.getBoundingClientRect();

            posData.top = rect.top;
            posData.right = rect.right;
            posData.bottom = rect.bottom;
            posData.left = rect.left;
            posData.width = rect.width;
            posData.height = rect.height;
        }

        if (this.mixer.config.animation.animateResizeTargets) {
            const styles = el.ownerDocument.defaultView!.getComputedStyle(el);

            posData.marginBottom = parseFloat(styles.marginBottom);
            posData.marginRight = parseFloat(styles.marginRight);
        }

        return posData;
    }

    cleanUp(): void {
        const el = this.dom.el as HTMLElement;

        this.isBound = false;
        this.callback = null;
        this.operation = null;

        el.style.transform = '';
        el.style.transition = '';
        el.style.opacity = '';

        if (this.mixer.config.animation.animateResizeTargets) {
            el.style.width = '';
            el.style.height = '';
            el.style.marginRight = '';
            el.style.marginBottom = '';
        }
    }
}
