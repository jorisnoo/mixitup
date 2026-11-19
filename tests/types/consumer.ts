// Resolve the package through its public exports, as an ESM consumer would.
import mixitup, { type MixitupCommand, type MixitupMixer, type MixitupOptions, type MixitupState } from 'mixitup';

declare const container: HTMLElement;
const options: MixitupOptions = { selectors: { target: '.blog-item' }, animation: { duration: 300 } };
const mixer: MixitupMixer = mixitup(container, options);
const command: MixitupCommand = { filter: '.category-b', sort: 'published:desc' };
const targets = container.querySelectorAll('.mix');
const done = (state: MixitupState) => state.totalShow;

mixer.configure({ callbacks: { onMixEnd: null } });
mixer.filter('.a', false, done);
mixer.sort(targets, done);
mixer.multimix(command, false);
mixer.multimix({ filter: targets, sort: Array.from(targets) });
mixer.insert('<div class="mix"></div>', 0, false, done);
mixer.remove(0, done);
mixer.dataset([{ id: 'one' }], false, done);
mixer.getConfig().animation.duration;
// @ts-expect-error The internal collection switch is not part of the public factory.
mixitup(container, options, document, true);
// @ts-expect-error Config groups are partial, not untyped.
mixer.configure({ animation: { duration: '300' } });
