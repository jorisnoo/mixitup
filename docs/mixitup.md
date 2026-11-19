# Mixer factory

`mixitup(container [,config] [,foreignDoc])`

The `mixitup()` "factory" function creates and returns individual instances
of MixItUp, known as "mixers", on which API methods can be called.

The factory is the default export of this ESM-only fork. After [installing the tagged tarball](../README.md#loading-mixitup), import it in your application:

```js
import mixitup from 'mixitup';
```

In a browser without a bundler, serve the bundle as a static asset. For example, if you copied `dist/mixitup.js` to `/assets/mixitup.js`:

```html
<script type="module">
    import mixitup from '/assets/mixitup.js';
    const mixer = mixitup('.container');
</script>
```

The factory is not a global. There is no CommonJS or RequireJS build, and the upstream v3 extension registration API is not available.

|   |Type | Name | Description
|---|--- | --- | ---
|Param   |`Element, string` | `container` | A container element or a selector for it.
|Param   |`object` | `[config]` | An optional "configuration object" used to customize the behavior of the MixItUp instance.
|Param   |`Document` | `[foreignDoc]` | An optional reference to a document, for example when controlling a container in a same-origin iframe.
|Returns |`MixitupMixer` | A mixer exposing the public methods.

###### Example 1: Creating a mixer instance with an element reference

```js
var containerEl = document.querySelector('.container');

var mixer = mixitup(containerEl);
```
###### Example 2: Creating a mixer instance with a selector string

```js
var mixer = mixitup('.container');
```
###### Example 3: Passing a configuration object

```js
var mixer = mixitup(containerEl, {
    animation: {
        effects: 'fade scale(0.5)'
    }
});
```
###### Example 4: Passing an iframe reference

```js
var mixer = mixitup(containerEl, config, foreignDocument);
```
