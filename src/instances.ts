import type { Mixer } from './mixer';

export const instances = new WeakMap<Element, Mixer>();

// A persistent control can retain a removed grid through its click listener. Observe
// removals only while the document contains registered mixers with control bindings.
const monitored = new WeakMap<Element, Document>();
const documents = new WeakMap<Document, { observer: MutationObserver; count: number }>();

export function registerInstance(el: Element, mixer: Mixer): void {
    instances.set(el, mixer);
    const doc = el.ownerDocument;
    if (!mixer.controls.length || !doc.defaultView) return;

    monitored.set(el, doc);
    const current = documents.get(doc);
    if (current) {
        current.count++;
        return;
    }

    const observer = new doc.defaultView.MutationObserver(records => {
        for (const { removedNodes } of records) {
            for (const node of removedNodes) {
                if (node.nodeType !== 1 || node.isConnected) continue;
                // Reparenting within the document is not teardown. For a detached subtree,
                // only visit indexed containers; unrelated mixers remain usable offscreen.
                const root = node as Element;
                if (monitored.has(root)) instances.get(root)?.destroy();
                if (!root.firstElementChild) continue;
                const walker = doc.createTreeWalker(root, 1 /* SHOW_ELEMENT */);
                while (walker.nextNode()) {
                    const el = walker.currentNode as Element;
                    if (monitored.has(el)) instances.get(el)?.destroy();
                }
            }
        }
    });
    observer.observe(doc, { childList: true, subtree: true });
    documents.set(doc, { observer, count: 1 });
}

export function unregisterInstance(el: Element): void {
    instances.delete(el);
    const doc = monitored.get(el);
    if (!doc) return;
    monitored.delete(el);

    const entry = documents.get(doc)!;
    if (--entry.count === 0) {
        entry.observer.disconnect();
        documents.delete(doc);
    }
}
