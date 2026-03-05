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
    return {
        animation: createDefaultAnimation(),
        behavior: createDefaultBehavior(),
        callbacks: createDefaultCallbacks(),
        controls: createDefaultControls(),
        classNames: createDefaultClassNames(),
        data: createDefaultData(),
        debug: createDefaultDebug(),
        layout: createDefaultLayout(),
        load: createDefaultLoad(),
        render: createDefaultRender(),
        selectors: createDefaultSelectors(),
        templates: createDefaultTemplates(),
    };
}
