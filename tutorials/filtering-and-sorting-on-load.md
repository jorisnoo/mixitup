# Filtering and Sorting on Load

Just as we can filter and sort the contents of a MixItUp container once it has been instantiated, we can also specify the initial filter and sort values "on load" – or at the point of instantiation – using the `load` configuration object.

This is particularly useful if we are tracking filter or sort state with a URL segment or hash, but also for any situation where you don't want to start from the default behavior.

## Default Behavior

If we pass no configuration object to MixItUp, the contents of our container will be shown according to the default filtering and sorting values. Respectively, these are:

## `all`

This is a short hand for filtering by the target selector (`'.mix'` by default), and results in all targets being shown.

## `default:asc`

The default order is simply the natural order that targets appear in the DOM when they are indexed on instantiation. This is considered to be ascending order, whereas a sorting value of `'default:desc'` will reverse the natural order.

## Using the `load` Configuration Stanza

Using exactly the same syntax we would use for the `.filter()` and `.sort()` API methods, we can override the default behavior by passing our own values to the load configuration object when we call the `mixitup()` factory function to instantiate our mixer:

### Example: Filtering on load

```js
var mixer = mixitup(containerEl, {
    load: {
        filter: '.category-2'
    }
});
```

### Example: Sorting on load

```js
var mixer = mixitup(containerEl, {
    load: {
        sort: 'published-date:desc'
    }
});
```

### Example: Simultaneous filtering and sorting on load

```js
var mixer = mixitup(containerEl, {
    load: {
        filter: '.category-2',
        sort: 'published-date:desc'
    }
});
```

## Possible Uses

Rather than hard coding in our values like the above examples, the `load` configuration stanza is typically used dynamically, so that MixItUp can be instantiated according to some previously recorded state in an automated way.

In these cases, we supply the configuration object with variables which would be dynamically set by some custom code in our application, prior to instantiation:

### Example: Passing a variable to the configuration object

```js
var initialFilter = 'all';

var mixer = mixitup(containerEl, {
    load: {
        filter: initialFilter
    }
});
```

This could be as simple as reading in a URL hash, or a dynamic URL segment from our application's router.

### Example: Reading a URL hash and mapping it into a DOM selector

```js
var initialFilter = 'all';
var hash = window.location.hash.replace(/^#/g, '');

if (hash) {
    initialFilter = '.' + CSS.escape(hash);
}
```

In the above example, the URL hash would be equivalent to a particular class name present on target elements, but any value could be used as long as it can be predictably mapped into a DOM selector string.

See the [Filtering by URL demo](../demos/filtering-by-url/index.html) for an example using the history API.

## Dealing with Complex State

A more complex `load` state, involving compound selectors, or simultaneous filtering and sorting, requires a URL structure that can contain all the necessary data, (ideally in a human readable format) as well as an associated mapping function to transform it into values compatible with the MixItUp API.

For example, an application could parse this hash into type, size and color, map the values to its known categories, and combine them into a selector:

```text
/store/#type=shirt&size=medium,large&color=red
```

Hash URLs are particularly easy to implement as they have no server-side implications, but if you're comfortable with server-side development, you may want to take advantage of your application's router and dynamic URL segments instead.

For example, a route such as `/store/:type/:order/` could be used to filter and sort simultaneously as follows: `/store/shirt/price-low-to-high/`

Alternatively, If we are tracking internal application state with a state store such as Redux, we could just as easily pass values from a state object directly to MixItUp without the need to parse URLs:

### Example: Using template literals and attribute selectors

```js
var mixer = mixitup(containerEl, {
    load: {
        filter: `[data-category="${CSS.escape(state.category)}"]`,
        sort: state.order === 'newest' ? 'published-date:desc' : 'published-date:asc'
    }
});
```

If you are building a more complex JavaScript application however, you may want to use MixItUp's Dataset API.

When using the Dataset API, the use of DOM selectors is avoided completely, and instead we pass an array of objects representing any pre-rendered targets (and their order) to `load.dataset`

```js
var mixer = mixitup(containerEl, {
    data: {
        uidKey: 'id'
    },
    load: {
        dataset: [{id: 1}, {id: 2}, {id: 3}]
    }
});
```

Check out the [Using the Dataset API](./using-the-dataset-api.md) tutorial for more information.
