## Codebase Patterns
- Git commit signing via 1Password may fail; use `-c commit.gpgsign=false` as workaround
- Build output goes to `dist/` — ESM bundle + sourcemap + type declarations
- Vite library mode with `vite-plugin-dts` for declaration generation
- Old v3 source files remain in `src/*.js` — will be removed as each is ported to TypeScript
---

## 2026-03-05 - US-001
- What was implemented: Project infrastructure setup — modern build toolchain with Vite, Vitest, TypeScript
- Files changed:
  - `package.json` — updated to v4.0.0, type: module, new devDeps (typescript, vite, vitest, jsdom, vite-plugin-dts)
  - `tsconfig.json` — created (ES2020, strict, declarations)
  - `vite.config.ts` — created (library mode, ESM, sourcemaps, dts plugin)
  - `vitest.config.ts` — created (jsdom environment, tests/unit/**/*.test.ts)
  - `src/index.ts` — minimal placeholder
  - `tests/unit/placeholder.test.ts` — minimal passing test
  - Removed: `gulpfile.js`, `.jscsrc`, `.jshintrc`, `.travis.yml`, `composer.json`, `src/banner.js`, `src/wrapper.hbs`, `src/module-definitions.js`, `dist/mixitup.min.js`
- **Learnings for future iterations:**
  - `vite-plugin-dts` with `rollupTypes: true` bundles all declarations into a single `dist/types/index.d.ts`
  - Old v3 src/*.js files are still present and will need to be deleted as each module is ported
  - The project uses 1Password for git commit signing; if it fails, `-c commit.gpgsign=false` works
---

## 2026-03-05 - US-002
- What was implemented: All TypeScript type definitions for the v4 codebase
- Files changed:
  - `src/types/config.ts` — MixitupConfig + 12 sub-config interfaces (ConfigAnimation, ConfigBehavior, ConfigCallbacks, ConfigControls, ConfigClassNames, ConfigData, ConfigDebug, ConfigLayout, ConfigLoad, ConfigRender, ConfigSelectors, ConfigTemplates)
  - `src/types/state.ts` — MixitupState with all readonly properties
  - `src/types/commands.ts` — CommandFilter, CommandSort, CommandInsert, CommandRemove, CommandDataset, CommandChangeLayout, CommandMultimix + factory functions
  - `src/types/style-data.ts` — StyleData, TransformData, TransformDefaults, IMoveData
  - `src/types/dom.ts` — MixerDom and TargetDom interfaces
  - `src/types/public-api.ts` — MixitupMixer interface (replaces Facade)
- **Learnings for future iterations:**
  - All v3 config properties and their types have been captured from the JSDoc annotations in the source
  - State properties are all `readonly` in the interface since they should not be mutated externally
  - Command interfaces have factory functions for creating default instances
  - The `ConfigCallbacks` functions reference `MixitupState` as parameter types creating a cross-dependency between types/config.ts and types/state.ts
---

## 2026-03-05 - US-003
- What was implemented: Config default factory functions — 12 individual factory files + aggregated `createDefaultConfig()`
- Files changed:
  - `src/config/animation.ts` — createDefaultAnimation()
  - `src/config/behavior.ts` — createDefaultBehavior()
  - `src/config/callbacks.ts` — createDefaultCallbacks()
  - `src/config/class-names.ts` — createDefaultClassNames()
  - `src/config/controls.ts` — createDefaultControls()
  - `src/config/data.ts` — createDefaultData()
  - `src/config/debug.ts` — createDefaultDebug()
  - `src/config/layout.ts` — createDefaultLayout()
  - `src/config/load.ts` — createDefaultLoad()
  - `src/config/render.ts` — createDefaultRender()
  - `src/config/selectors.ts` — createDefaultSelectors()
  - `src/config/templates.ts` — createDefaultTemplates()
  - `src/config/defaults.ts` — createDefaultConfig() aggregator
- **Learnings for future iterations:**
  - Each config factory returns a fresh object (no shared references) to avoid mutation bugs
  - Default values confirmed from v3 prototype assignments in config-*.js files
  - ConfigTemplates is currently empty `{}` — reserved for future use
---

## 2026-03-05 - US-004
- What was implemented: Helpers module modernization — `src/helpers.ts` with 23 retained helpers as typed named exports
- Files changed:
  - `src/helpers.ts` — created with all retained helpers: extend, template, index, camelCase, pascalCase, dashCase, isElement, createElement, removeWhitespace, isEqualArray, deepEquals, arrayShuffle, debounce, position, getHypotenuse, getIntersectionRatio, children, clean, randomHex, getDocumentState, isVisible, getClassname, getProperty
- Removed helpers (now native): hasClass/addClass/removeClass (classList), on/off (addEventListener), getCustomEvent (new CustomEvent), arrayFromList (Array.from), bind (arrow functions), seal/freeze (call directly), defer/all (Promise), getPrefix (no vendor prefixes), closestParent (el.closest), isEmptyObject (Object.keys), compareVersions (extension system removed), Deferred class, getOriginalEvent
- `children()` now uses `:scope > selector` instead of temporary ID hack
- **Learnings for future iterations:**
  - The `extend()` function's `source` param needs `as any` cast to avoid TS union indexing errors with `Record<string, any> | any[]`
  - `handleExtendError` was kept as a private function (not exported) since it's only used internally by `extend`
  - The old `h.js` references `mixitup.messages` in `handleExtendError` — replaced with inline error message strings for now; will need to align with `messages.ts` when that module is ported in US-006
---

## 2026-03-05 - US-005
- What was implemented: Simplified features module — `src/features.ts` as a frozen singleton constant
- Files changed:
  - `src/features.ts` — created with standard CSS property names (no vendor prefixes), TWEENABLE array, and `hasTransitions: true`
- Removed: all vendor prefix detection (setPrefixes, VENDORS array), `Has` sub-class, `window.Promise` check, `canary` element, `runTests`, `init` method
- **Learnings for future iterations:**
  - The features module is now a simple constant object — no class, no initialization needed
  - Other modules that reference `features.transformProp` etc. will get the standard CSS property name directly (e.g., `'transform'`)
  - `hasTransitions` replaces the old `has.transitions` — consumers will need to reference `features.hasTransitions` instead of `features.has.transitions`
---

## 2026-03-05 - US-006
- What was implemented: Internal data classes as TypeScript interfaces with factory functions, events module with `fire()`, and messages module with template compilation
- Files changed:
  - `src/operation.ts` — Operation interface and `createOperation()` factory with all properties from v3 constructor
  - `src/internal/queue-item.ts` — QueueItem interface and `createQueueItem()` factory (deferred uses native Promise)
  - `src/internal/user-instruction.ts` — UserInstruction interface and `createUserInstruction()` factory
  - `src/internal/ui-class-names.ts` — UiClassNames interface and `createUiClassNames()` factory
  - `src/events.ts` — `fire()` function using `new CustomEvent()` directly (no createEvent fallback), typed `MixitupEventType` union, `EventDetail` interface
  - `src/messages.ts` — compiled messages singleton using `template()` and `camelCase()` from helpers
- All `callActions`/`callFilters` hook calls removed from every module
- All `mixitup.Base.call(this)` and prototypal inheritance removed
- **Learnings for future iterations:**
  - The old `h.seal(this)` pattern is replaced by TypeScript's type system enforcing property shapes
  - `EventDetail.state` is shallow-copied via spread to prevent external mutation (mirrors v3 behavior of `new State()` + `extend()`)
  - Messages are compiled once at module load via `compileMessages()` — the `messages` export is a frozen singleton of compiled template functions
  - QueueItem's `deferred` property changed from a jQuery-style Deferred to a typed object with `{ resolve, reject, promise }` for native Promise compatibility
  - Internal modules live under `src/internal/` to distinguish them from public-facing modules
---

## 2026-03-05 - US-007
- What was implemented: Target class converted from ES5 prototypal to TypeScript ES class
- Files changed:
  - `src/target.ts` — created as ES class with typed properties and all methods from v3
  - `src/types/style-data.ts` — updated `IMoveData.callback` signature to `(target, operation)` and added `tweenData` property
- All ~39 `callActions`/`callFilters` hook calls removed; logic inlined
- `mixitup.Base.call(this)` and prototypal inheritance removed
- `h.addClass`/`h.removeClass` replaced with `el.classList` (not needed in Target — Target uses style manipulation)
- `h.on`/`h.off` replaced with `addEventListener`/`removeEventListener`
- `var self = this` replaced with arrow functions and direct `this` usage
- `TargetDom` inlined as a typed property `{ el: null }`
- Vendor-prefixed CSS references (`mixitup.features.transformProp`) replaced with standard `'transform'`/`'transition'`
- Only `'transitionend'` event used (removed `'webkitTransitionEnd'`)
- **Learnings for future iterations:**
  - The `mixer` property is typed as `any` since the Mixer class hasn't been ported yet (US-009). Once Mixer is ported, this should be properly typed
  - `IMoveData` needed `tweenData` property added — v3 uses it in `applyTween` but it wasn't in the original type definition
  - `IMoveData.callback` signature is `(target, operation)` — the v3 code calls `self.callback.call(self, self.operation)`
  - `.chief/` directory is in `.gitignore` — PRD updates can't be committed
---

## 2026-03-05 - US-008
- What was implemented: Control class and ControlDefinition converted from ES5 prototypal to TypeScript ES classes/interfaces
- Files changed:
  - `src/control.ts` — created as ES class with typed properties and all methods from v3
  - `src/control-definition.ts` — created with `ControlDefinition` interface, `createControlDefinition()` factory, and static `controlDefinitions` array
  - `src/events.ts` — added optional `control` property to `fire()` detail parameter (used by `mixClick` event)
- All ~28 `callActions`/`callFilters` hook calls removed; logic inlined
- `mixitup.Base.call(this)` and prototypal inheritance removed
- `h.addClass`/`h.removeClass` replaced with `el.classList.add`/`el.classList.remove`
- `h.on`/`h.off` replaced with `addEventListener`/`removeEventListener`
- `h.closestParent` replaced with `el.closest()`
- `h.hasClass` replaced with `el.classList.contains()`
- Module-level `controls` array exported (replaces `mixitup.controls`)
- Module-level `controlDefinitions` array exported (replaces `mixitup.controlDefinitions`)
- **Learnings for future iterations:**
  - The `fire()` function needed an optional `control` property added to the detail type for the `mixClick` event
  - `ControlDefinition` objects are frozen (immutable) — they're static config, not mutable state
  - The `bound` array and `mixer` types are `any` since Mixer class hasn't been ported yet (US-009)
  - `canDisable` checks `typeof el.disabled === 'boolean'` to detect button/input elements
---

## 2026-03-05 - US-009
- What was implemented: Mixer class (4,362 lines) converted from ES5 prototypal to TypeScript ES class
- Files changed:
  - `src/mixer.ts` — created as ES class implementing MixitupMixer interface with all methods from v3
  - `src/operation.ts` — updated array types from `Element[]` to `any[]` for internal Target object storage
  - `src/types/config.ts` — updated ConfigCallbacks signatures to include `instance` parameter matching v3 API
- All ~91 `callActions`/`callFilters` hook calls removed; logic inlined
- `mixitup.Base.call(this)` and prototypal inheritance removed
- `h.addClass`/`h.removeClass` replaced with `el.classList.add`/`el.classList.remove`
- `h.on`/`h.off` replaced with `addEventListener`/`removeEventListener`
- `h.arrayFromList` replaced with `Array.from()`
- `h.closestParent` replaced with `el.closest()`
- `h.defer(mixitup.libraries)` replaced with native `Promise` constructor
- Vendor-prefixed CSS (`mixitup.features.perspectiveProp` etc.) replaced with standard names
- `var self = this` replaced with arrow functions and direct `this`
- `MixerDom` inlined as typed property interface
- `mixitup.instances` global replaced with module-level `Map<string, Mixer>`
- `mixitup.controls` global replaced with module-level array import from `control.ts`
- `mixitup.controlDefinitions` replaced with import from `control-definition.ts`
- `TRANSFORM_DEFAULTS` replaces `mixitup.transformDefaults` as module-level const
- `createStyleData()` factory replaces `new mixitup.StyleData()`
- `createMoveData()` factory replaces `new mixitup.IMoveData()`
- `willSort()` renamed to `willSortCheck()` to avoid conflict with `operation.willSort` property
- All 25 public API method signatures preserved exactly as in v3
- **Learnings for future iterations:**
  - The Operation interface arrays (`show`, `hide`, `toShow`, etc.) store Target objects internally but were typed as `Element[]` — changed to `any[]` for flexibility
  - ConfigCallbacks signatures in v3 pass `instance` as final argument — the type definitions needed updating
  - The v3 `h.defer(mixitup.libraries)` pattern abstracted jQuery/Promise deferred — replaced with simple `new Promise()` constructor wrapper
  - `checkProgress` is passed as a callback to `Target.move()` — needs `unknown` params to match IMoveData callback type
  - The `parseMultimixArgs` coerces string command values (like `filter: '.class-a'`) into typed command objects via the respective parse methods
---
