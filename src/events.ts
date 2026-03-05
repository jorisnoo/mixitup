import type { MixitupState } from './types/state';
import { extend } from './helpers';

export interface EventDetail {
    state: MixitupState | null;
    futureState: MixitupState | null;
    instance: any;
    originalEvent: Event | null;
}

const EVENT_TYPES = ['mixStart', 'mixBusy', 'mixEnd', 'mixFail', 'mixClick'] as const;

export type MixitupEventType = typeof EVENT_TYPES[number];

/**
 * Dispatches a MixItUp custom event from the given element.
 */
export function fire(
    eventType: MixitupEventType,
    el: Element,
    detail: {
        state: MixitupState;
        futureState?: MixitupState;
        instance: any;
        originalEvent?: Event;
    },
    doc?: Document
): void {
    if (!EVENT_TYPES.includes(eventType)) {
        throw new Error('Event type "' + eventType + '" not found.');
    }

    const eventDetail: EventDetail = {
        state: { ...detail.state },
        futureState: detail.futureState ? { ...detail.futureState } : null,
        instance: detail.instance,
        originalEvent: detail.originalEvent || null,
    };

    const event = new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true,
        detail: eventDetail,
    });

    el.dispatchEvent(event);
}
