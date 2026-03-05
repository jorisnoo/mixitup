import { createUiClassNames, type UiClassNames } from './internal/ui-class-names';
import { extend } from './helpers';
import { fire } from './events';

export const controls: Control[] = [];

type ControlStatus = 'inactive' | 'active' | 'disabled' | 'live';

export class Control {
    el: HTMLElement | null = null;
    selector: string = '';
    bound: any[] = [];
    pending: number = -1;
    type: string = '';
    status: ControlStatus = 'inactive';
    filter: string = '';
    sort: string = '';
    canDisable: boolean = false;
    handler: ((e: Event) => void) | null = null;
    classNames: UiClassNames = createUiClassNames();

    init(el: HTMLElement, type: string, selector: string): void {
        this.el = el;
        this.type = type;
        this.selector = selector;

        if (this.selector) {
            this.status = 'live';
        } else {
            this.canDisable = typeof (el as any).disabled === 'boolean';

            switch (this.type) {
                case 'filter':
                    this.filter = el.getAttribute('data-filter') || '';
                    break;
                case 'toggle':
                    this.filter = el.getAttribute('data-toggle') || '';
                    break;
                case 'sort':
                    this.sort = el.getAttribute('data-sort') || '';
                    break;
                case 'multimix':
                    this.filter = el.getAttribute('data-filter') || '';
                    this.sort = el.getAttribute('data-sort') || '';
                    break;
            }
        }

        this.bindClick();

        controls.push(this);
    }

    isBound(mixer: any): boolean {
        return this.bound.indexOf(mixer) > -1;
    }

    addBinding(mixer: any): void {
        if (!this.isBound(mixer)) {
            this.bound.push(mixer);
        }
    }

    removeBinding(mixer: any): void {
        let removeIndex = this.bound.indexOf(mixer);

        if (removeIndex > -1) {
            this.bound.splice(removeIndex, 1);
        }

        if (this.bound.length < 1) {
            this.unbindClick();

            removeIndex = controls.indexOf(this);

            if (removeIndex > -1) {
                controls.splice(removeIndex, 1);
            }

            if (this.status === 'active') {
                this.renderStatus(this.el!, 'inactive');
            }
        }
    }

    bindClick(): void {
        this.handler = (e: Event) => {
            this.handleClick(e as MouseEvent);
        };

        this.el!.addEventListener('click', this.handler);
    }

    unbindClick(): void {
        if (this.handler) {
            this.el!.removeEventListener('click', this.handler);
        }

        this.handler = null;
    }

    handleClick(e: MouseEvent): void {
        let button: HTMLElement | null = null;
        let isActive = false;
        let returnValue: any;
        const command: Record<string, any> = {};

        this.pending = 0;

        const mixer = this.bound[0];

        if (!this.selector) {
            button = this.el;
        } else {
            button = (e.target as Element).closest(
                mixer.config.selectors.control + this.selector
            ) as HTMLElement | null;
        }

        if (!button) {
            return;
        }

        switch (this.type) {
            case 'filter':
                command.filter = this.filter || button.getAttribute('data-filter');
                break;
            case 'sort':
                command.sort = this.sort || button.getAttribute('data-sort');
                break;
            case 'multimix':
                command.filter = this.filter || button.getAttribute('data-filter');
                command.sort = this.sort || button.getAttribute('data-sort');
                break;
            case 'toggle':
                command.filter = this.filter || button.getAttribute('data-toggle');

                if (this.status === 'live') {
                    isActive = button.classList.contains(this.classNames.active);
                } else {
                    isActive = this.status === 'active';
                }
                break;
        }

        const commands: Record<string, any>[] = [];

        for (let i = 0; i < this.bound.length; i++) {
            const clone: Record<string, any> = {};
            extend(clone, command);
            commands.push(clone);
        }

        this.pending = this.bound.length;

        for (let i = 0; i < this.bound.length; i++) {
            const boundMixer = this.bound[i];
            const cmd = commands[i];

            if (!cmd) {
                continue;
            }

            if (!boundMixer.lastClicked) {
                boundMixer.lastClicked = button;
            }

            fire('mixClick', boundMixer.dom.container, {
                state: boundMixer.state,
                instance: boundMixer,
                originalEvent: e,
                control: boundMixer.lastClicked,
            }, boundMixer.dom.document);

            if (typeof boundMixer.config.callbacks.onMixClick === 'function') {
                returnValue = boundMixer.config.callbacks.onMixClick.call(
                    boundMixer.lastClicked,
                    boundMixer.state,
                    e,
                    boundMixer
                );

                if (returnValue === false) {
                    continue;
                }
            }

            if (this.type === 'toggle') {
                isActive
                    ? boundMixer.toggleOff(cmd.filter)
                    : boundMixer.toggleOn(cmd.filter);
            } else {
                boundMixer.multimix(cmd);
            }
        }
    }

    update(command: any, toggleArray: string[]): void {
        this.pending--;
        this.pending = Math.max(0, this.pending);

        if (this.pending > 0) return;

        if (this.status === 'live') {
            this.updateLive(command, toggleArray);
        } else {
            const actions: Record<string, any> = {
                sort: this.sort,
                filter: this.filter,
            };

            this.parseStatusChange(this.el!, command, actions, toggleArray);
        }
    }

    updateLive(command: any, toggleArray: string[]): void {
        if (!this.el) return;

        const controlButtons = this.el.querySelectorAll(this.selector);

        for (let i = 0; i < controlButtons.length; i++) {
            const button = controlButtons[i] as HTMLElement;
            const actions: Record<string, any> = {};

            switch (this.type) {
                case 'filter':
                    actions.filter = button.getAttribute('data-filter');
                    break;
                case 'sort':
                    actions.sort = button.getAttribute('data-sort');
                    break;
                case 'multimix':
                    actions.filter = button.getAttribute('data-filter');
                    actions.sort = button.getAttribute('data-sort');
                    break;
                case 'toggle':
                    actions.filter = button.getAttribute('data-toggle');
                    break;
            }

            this.parseStatusChange(button, command, actions, toggleArray);
        }
    }

    parseStatusChange(
        button: HTMLElement,
        command: any,
        actions: Record<string, any>,
        toggleArray: string[]
    ): void {
        switch (this.type) {
            case 'filter':
                if (command.filter === actions.filter) {
                    this.renderStatus(button, 'active');
                } else {
                    this.renderStatus(button, 'inactive');
                }
                break;
            case 'multimix':
                if (command.sort === actions.sort && command.filter === actions.filter) {
                    this.renderStatus(button, 'active');
                } else {
                    this.renderStatus(button, 'inactive');
                }
                break;
            case 'sort':
                let alias = '';

                if (command.sort.match(/:asc/g)) {
                    alias = command.sort.replace(/:asc/g, '');
                }

                if (command.sort === actions.sort || alias === actions.sort) {
                    this.renderStatus(button, 'active');
                } else {
                    this.renderStatus(button, 'inactive');
                }
                break;
            case 'toggle':
                if (toggleArray.length < 1) {
                    this.renderStatus(button, 'inactive');
                }

                if (command.filter === actions.filter) {
                    this.renderStatus(button, 'active');
                }

                for (let i = 0; i < toggleArray.length; i++) {
                    const toggle = toggleArray[i];

                    if (toggle === actions.filter) {
                        this.renderStatus(button, 'active');
                        break;
                    }

                    this.renderStatus(button, 'inactive');
                }
                break;
        }
    }

    renderStatus(button: HTMLElement, status: ControlStatus): void {
        switch (status) {
            case 'active':
                button.classList.add(this.classNames.active);
                button.classList.remove(this.classNames.disabled);

                if (this.canDisable) (this.el as any).disabled = false;
                break;
            case 'inactive':
                button.classList.remove(this.classNames.active);
                button.classList.remove(this.classNames.disabled);

                if (this.canDisable) (this.el as any).disabled = false;
                break;
            case 'disabled':
                if (this.canDisable) (this.el as any).disabled = true;

                button.classList.add(this.classNames.disabled);
                button.classList.remove(this.classNames.active);
                break;
        }

        if (this.status !== 'live') {
            this.status = status;
        }
    }
}
