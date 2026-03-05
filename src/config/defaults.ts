import type { MixitupConfig } from '../types/config';

import { createDefaultAnimation } from './animation';
import { createDefaultBehavior } from './behavior';
import { createDefaultCallbacks } from './callbacks';
import { createDefaultClassNames } from './class-names';
import { createDefaultControls } from './controls';
import { createDefaultData } from './data';
import { createDefaultDebug } from './debug';
import { createDefaultLayout } from './layout';
import { createDefaultLoad } from './load';
import { createDefaultRender } from './render';
import { createDefaultSelectors } from './selectors';
import { createDefaultTemplates } from './templates';

export function createDefaultConfig(): MixitupConfig {
    const config = {
        animation: Object.seal(createDefaultAnimation()),
        behavior: Object.seal(createDefaultBehavior()),
        callbacks: Object.seal(createDefaultCallbacks()),
        controls: Object.seal(createDefaultControls()),
        classNames: Object.seal(createDefaultClassNames()),
        data: Object.seal(createDefaultData()),
        debug: Object.seal(createDefaultDebug()),
        layout: Object.seal(createDefaultLayout()),
        load: Object.seal(createDefaultLoad()),
        render: Object.seal(createDefaultRender()),
        selectors: Object.seal(createDefaultSelectors()),
        templates: Object.seal(createDefaultTemplates()),
    };

    return Object.seal(config);
}
