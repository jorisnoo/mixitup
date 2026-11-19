# Integrating MixItUp into Your Project

_MixItUp can be integrated into in a variety of projects from static sites to WordPress themes and API-driven web applications._

First [install and import this ESM fork](../README.md#loading-mixitup). The examples below cover static markup, CMS-rendered content and API-driven applications.

## Static Site / Static Content

The most simple integration of MixItUp involves progressively enhancing content in static HTML, enabling the content to be filtered and sorted.

With this integration, we simply have to ensure that all the content exists in the HTML, and each item is tagged (by a class name or some other attribute) with the appropriate meta data to enable filtering and sorting. This type of integration utilizes a "DOM-driven" approach, which is how MixItUp has functioned since version 1.

### Hard-coding MixItUp Targets

```html
<div class="container">
    <a href="/portfolio/item-1/" class="mix web-design">...</a>
    <a href="/portfolio/item-2/" class="mix web-design typography">...</a>
    <a href="/portfolio/item-3/" class="mix ux-design">...</a>
    <a href="/portfolio/item-4/" class="mix web-design ux-design">...</a>
    ...
</div>
```

If we know what attributes we want to filter and sort by, we can simply hard-code our "controls" into the markup, creating a button for each possible category or sorting order.

### Hard-coding MixItUp Controls

```html
<div class="controls">
    <button type="button" data-filter=".web-design">Web Design</button>
    <button type="button" data-filter=".ux-design">UX Design</button>
    <button type="button" data-filter=".typography">Typography</button>
</div>
```

Simple portfolio pages are the most common use-case for this type of integration. Due to their curated nature, portfolios typically include only a small amount of content (less than 100 items), and a known number of categories.

- Further Reading: [Filtering with MixItUp](./filtering-with-mixitup.md)
- Further Reading: [Sorting with MixItUp](./sorting-with-mixitup.md)

## Content Management Systems

Integrating MixItUp with a CMS is really no different from the static implementation described above. Again, we just need to ensure that all content exists in the HTML at the point that the page's JavaScript loads and MixItUp is instantiated.

As we don't provide a specific WordPress plugin, many newcomers ask us if MixItUp is compatible with WordPress. The answer is that MixItUp can be easily integrated into **any** CMS as long as the developer has basic knowledge of the CMS's template language (e.g. PHP), its API (e.g. "The Loop"), and how to create or edit custom themes.

A CMS gives us the ability to dynamically output content, categories, and controls according to the contents of a database. On the admin-side, WordPress gives us everything we need out of the box in terms of creating post types, posts, and categories, so there is no need for an additional admin-side MixItUp plugin. The [Advanced Custom Fields](https://www.advancedcustomfields.com/) plugin can also be very useful in further enhancing the admin interface with functionality such as sortable lists of posts.

> [!NOTE]
> As MixItUp is a client-side JavaScript library and WordPress is a server-side PHP CMS, it is important to understand that these two worlds need not know anything about each other, as all integration takes place after the point that the HTML has been rendered.

A basic example of using the WordPress "post loop" to output posts as MixItUp target elements in a container might look like this:

### Using the WordPress "post loop" to render MixItUp targets

```html
<div class="container">
    <!-- Iterate through each post -->

    <?php while(have_posts()) : the_post(); ?>

        <!-- For each post, construct a space-seperated list of its category "slugs" to function as class names -->
        <!-- e.g. "web-design ux-design typography" -->

        <?php
        $categories = get_the_category();
        $slugs = wp_list_pluck($categories, 'slug');
        $class_names = join(' ', $slugs);
        ?>

        <!-- Output markup for each post, including the post's "permalink", and the list of category "slugs" -->

        <a href="<?php the_permalink(); ?>" class="mix<?php if ($class_names) { echo ' ' . $class_names;} ?>">
            <!-- Post content -->
        </a>
    <?php endwhile; ?>
</div>
```

If you know that your categories will never change, you could easily hard-code MixItUp controls into your theme's template just as above. However, WordPress also gives us the APIs to easily retrieve a list of all our categories or taxonomies (`get_categories()` or `get_terms()`), which we can then use to dynamically generate MixItUp controls.

### Using the WordPress get_categories() API to render MixItUp controls

```html
<div class="controls">
    <!-- Get a list of all categories in the database, excluding those not assigned to posts -->

    <?php
    $all_categories = get_categories(array(
        'hide_empty' => true
    ));
    ?>

    <!-- Iterate through each category -->

    <?php foreach($all_categories as $category): ?>
        <!-- Output control button markup, setting the data-filter attribute as the category "slug" -->

        <button type="button" data-filter=".<?php echo $category->slug; ?>"><?php echo $category->name; ?></button>
    <?php endforeach; ?>
</div>
```

The above examples could be applied to any CMS with similar APIs. For more information on WordPress theming, using "The Loop", or working with custom post types and taxonomies, please visit the **WordPress Codex**. Unfortunately we cannot respond to any questions relating to WordPress theming, but you will find a huge amount of information available if you search for it.

Due to the relative simplicity with which we can now integrate MixItUp with dynamic content, it may be tempting to see this is a one-size-fits-all solution to filtering and sorting dynamic content.

However, it is important to be aware that **client-side filtering and sorting has some very real limits when it comes to scale.**

> [!WARNING]
> If you expect that your content will grow to hundreds or thousands of items, then this kind of integration will become unperformant quickly both in terms of large database queries on the server-side, and the speed of DOM manipulation and animation on the client-side.

When dealing with large datasets, we strongly recommend traditional server-side URL-based filtering and sorting, or an API-driven "ajax" solution. If the latter is an option for you, read on!

## API-Driven Applications

The CMS implementation above allows front-end developers to easily integrate MixItUp on top of dynamically generated markup without the need for extensive back-end development knowledge. As mentioned however, a fully server-rendered implementation with DOM-based filtering and sorting becomes unperformant quickly once the dataset scales into the hundreds and thousands of items.

A common solution to this problem involves letting the back-end take on the responsibility of filtering and sorting content in response to a "query" from the client, and then return HTML with only the relevant items, or, return data representing the result of the query over an API (e.g. a JSON array).

This second "API-driven" approach is how many modern JavaScript web applications deal with filtering and sorting lists of content. While we incur a minor performance penalty equal to the duration of each API call, and a more "asynchronous" user-experience, this approach is infinitely scalable as the client need only know about the results of the query, and not the full dataset, which in the case of an e-commerce storefront could easily contain thousands or millions of items.

The [Dataset API](./using-the-dataset-api.md) animates changes to an ordered array of items. Build your own controls, send the user's criteria to your API and pass the result to `mixer.dataset(items)`. Do not use DOM-based filter or sort controls with a dataset mixer.

Upstream v3 extensions such as MultiFilter and Pagination are not supported in this fork. To paginate, fetch or slice the page in your application, then pass just that page's items to the mixer.

## UI Components – Modals, Carousels and Accordions

Leaving the idea of databases and datasets behind, in its simplest form MixItUp's underlying animation engine can be thought of as a means to gracefully animate the position and size of any element between two or more states. This is also the underlying concept behind many common pieces of UI such as modals, carousels, drop-downs, and accordions, which means that with some imagination and a bit of JavaScript knowledge we can easily use MixItUp to perform these functions for us.

If you're already using MixItUp in your project, repurposing it to power these pieces of UI can save your project a huge overhead by removing the need for countless other third-party libraries and scripts.
