# MixItUp

> A modernised fork of [patrickkunka/mixitup](https://github.com/patrickkunka/mixitup), rewritten in TypeScript with modern tooling (Vite, Vitest). ESM-only, targeting modern browsers.

[![Latest Release](https://img.shields.io/npm/v/mixitup.svg?style=flat-square)](https://www.npmjs.com/package/mixitup)

MixItUp is a high-performance, dependency-free library for animated DOM manipulation, giving you the power to filter, sort, add and remove DOM elements with beautiful animations.

MixItUp plays nice with your existing HTML and CSS, making it a great choice for responsive layouts and compatible with inline-flow, percentages, media queries, flexbox and more.

#### Licensing

MixItUp is open source and free to use for all use cases, under the Apache 2.0 license.

#### Documentation

- [Factory Function](./docs/mixitup.md)
- [Configuration Object](./docs/mixitup.Config.md)
- [Mixer API Methods](./docs/mixitup.Mixer.md)
- [State Object](./docs/mixitup.State.md)
- [Mixer Events](./docs/mixitup.Events.md)

#### Tutorials

##### [Integrating MixItUp into Your Project](./tutorials/integrating-mixitup-into-your-project.md)

MixItUp can be used with static sites, CMSs, web apps and more. This tutorial will help you choose the right integration for your project.

##### [Filtering with MixItUp](./tutorials/filtering-with-mixitup.md)

A summary of the various filtering techniques available in MixItUp – filter/toggle controls, multidimensional filtering, and the filter API.

##### [Sorting with MixItUp](./tutorials/sorting-with-mixitup.md)

A summary of the various sorting techniques available in MixItUp – default sort, attribute sort, multi-attribute sort, and the sort API.

##### [MixItUp Grid Layouts](./tutorials/mixitup-grid-layouts.md)

A summary of the three most common approaches to responsive grids – inline-block, flex-box, and floats – in the context of MixItUp.

##### [Marking Up MixItUp Containers](./tutorials/marking-up-mixitup-containers.md)

This tutorial explores various container markup structures, and explains what is and isn't possible with MixItUp.

##### [Filtering and Sorting on Load](./tutorials/filtering-and-sorting-on-load.md)

A look at how we can use the configuration object to load MixItUp in a state other than its default filtering and sorting behavior.

##### [Using the Dataset API](./tutorials/using-the-dataset-api.md)

The Dataset API allows interaction with MixItUp purely via changes to a data model, avoiding the use of DOM selectors.

#### Browser Support

This fork targets modern browsers only.

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

#### Contents

- [Building the Container](#building-the-container)
- [Building Controls](#building-controls)
- [Styling the Container](#styling-the-container)
- [Loading MixItUp](#loading-mixitup)
- [Creating a Mixer](#creating-a-mixer)
- [Configuration](#configuration)

Most commonly, MixItUp is applied to a **"container"** of **"target"** elements, which could be a portfolio of projects, a list of blog posts, a selection of products, or any kind of UI where filtering and/or sorting would be advantageous.

To get started, follow these simple steps:

### Building the Container

By default, MixItUp will query the container for targets matching the selector `'.mix'`.

```html
<div class="container">
    <div class="mix category-a" data-order="1"></div>
    <div class="mix category-b" data-order="2"></div>
    <div class="mix category-b category-c" data-order="3"></div>
    <div class="mix category-a category-d" data-order="4"></div>
</div>
```

Targets can be filtered using any valid selector e.g. `'.category-a'`, and are sorted via optional custom data attributes e.g. `'data-order'`.

Further reading: [Marking-up MixItUp Containers](./tutorials/marking-up-mixitup-containers.md)

### Building Controls

One way that filtering and sorting happens is when controls are clicked. You may use any clickable element as a control, but `<button type="button">` is recommended for accessibility.

#### Filter Controls

Filter controls are queried based on the presence of a `data-filter` attribute, whose value must be `'all'`, `'none'`, or a valid selector string e.g. `'.category-a'`.

```html
<button type="button" data-filter="all">All</button>
<button type="button" data-filter=".category-a">Category A</button>
<button type="button" data-filter=".category-b">Category B</button>
<button type="button" data-filter=".category-c">Category C</button>
```

Further reading: [Filtering with MixItUp](./tutorials/filtering-with-mixitup.md)

#### Sort Controls

Sort controls are queried based on the presence of a `data-sort` attribute, whose value takes the form of a "sort string" made up of the name of the attribute to sort by, followed by an optional colon-separated sorting order e.g. `'order'`, `'order:asc'`, `'order:desc'`.

```html
<button type="button" data-sort="order:asc">Ascending</button>
<button type="button" data-sort="order:descending">Descending</button>
<button type="button" data-sort="random">Random</button>
```

The values `'default'` and `'random'` are also valid, with `'default'` referring to the original order of target elements in the DOM at the time of mixer instantiation.

Further reading: [Sorting with MixItUp](./tutorials/sorting-with-mixitup.md)

### Styling the Container

While MixItUp can be added on top of any existing CSS layout, we strongly recommend inline-block or flexbox-based styling over floats and legacy grid frameworks when dealing with grid-based designs for a number of reasons.

Further reading: [MixItUp Grid Layouts](./tutorials/mixitup-grid-layouts.md)

### Loading MixItUp

Install MixItUp via your package manager of choice:

```
npm install mixitup
```

Then import it as an ES module:

```js
import mixitup from 'mixitup';
```

This fork is distributed as an ESM bundle with TypeScript declarations included.

```ts
import type { MixitupConfig, MixitupState, MixitupMixer } from 'mixitup';
```

### Creating a Mixer

With the `mixitup()` factory function available, you may now instantiate a "mixer" on your container to enable MixItUp functionality.

Call the factory function passing a selector string or a reference to your container element as the first parameter, and a the newly instantiated mixer will be returned.

###### Example: Instantiating a mixer with a selector string

```js
const mixer = mixitup('.container');
```

###### Example: Instantiating a mixer with an element reference

```js
const mixer = mixitup(containerEl);
```

Your mixer is now ready for you to interact with, either via its controls (see above), or its API (see [Mixer API Methods](./docs/mixitup.Mixer.md)). Click a control or call an API method to check that everything is working correctly.

### Configuration

If you wish to customize the functionality of your mixer, an optional "configuration object" can be passed as the second parameter to the `mixitup` function. If no configuration object is passed, the default settings will be used.

Further reading: [Configuration Object](/docs/mixitup.Config.md)

###### Example: Passing a configuration object

```js
const mixer = mixitup(containerEl, {
    selectors: {
        target: '.blog-item'
    },
    animation: {
        duration: 300
    }
});
```

#### Using the API

If you wish to interact with your mixer via its API, the mixer reference returned by the factory function can be used to call API methods.

###### Example: Calling an API method

```js
const mixer = mixitup(containerEl);

mixer.filter('.category-a');
```

Further reading: [Mixer API Methods](./docs/mixitup.Mixer.md)

#### Building a modern JavaScript application?

You may wish to use MixItUp's "dataset" API. Dataset is designed for use in API-driven JavaScript applications, and can be used instead of DOM-based methods such as `.filter()`, `.sort()`, `.insert()`, etc. When used, insertion, removal, sorting and pagination can be achieved purely via changes to your data model, without the uglyness of having to interact with or query the DOM directly.

Further reading: [Using the Dataset API](./tutorials/using-the-dataset-api.md)

## Development

### Building

```
npm run build
```

Produces an ESM bundle at `dist/mixitup.js` with source maps and TypeScript declarations in `dist/types/`.

### Testing

```
npm test
```

Runs the full test suite via Vitest with jsdom.
