import mixitup from '../../dist/mixitup.js';

var sandbox     = document.querySelector('.sandbox');

var mixer = mixitup('#sandbox-1', {
    animation: {
        effects: 'fade',
        easing: 'cubic-bezier(1, 0, 0, 1)',
        duration: 400
    },
    load: {
        sort: 'random'
    }
});

console.log(mixer.getState());

sandbox.addEventListener('mixStart', function(e) {
    console.log('mixStart', e.detail);
});

sandbox.addEventListener('mixEnd', function(e) {
    console.log('mixEnd', e.detail);
});

sandbox.addEventListener('mixClick', function(e) {
    console.log('mixClick', e.detail);
});

sandbox.addEventListener('mixBusy', function(e) {
    console.log('mixBusy', e.detail);
});

sandbox.addEventListener('mixFail', function(e) {
    console.log('mixFail', e.detail);
});

document.querySelector('.js-append').addEventListener('click', function() {
   mixer.append('<div class="mix cat-3" data-order="3">C 3</div>');
});

document.querySelector('.js-prepend').addEventListener('click', function() {
   mixer.prepend('<div class="mix cat-1" data-order="2">A 2</div>');
});

document.querySelector('.js-insert-at-index').addEventListener('click', function() {
   mixer.insert('<div class="mix cat-4" data-order="5">D 5</div>', 4);
});

document.querySelector('.js-remove-via-element').addEventListener('click', function() {
    var state = mixer.getState();

    if (state.targets[0]) {
        mixer.remove(state.targets[0]);
    }
});

document.querySelector('.js-remove-via-index').addEventListener('click', function() {
    mixer.remove(3);
});

document.querySelector('.js-insert-multiple-via-markup').addEventListener('click', function() {
    mixer.prepend(
        '<div class="mix cat-4" data-order="1">D 1</div>' +
        '<div class="mix cat-4" data-order="2">D 2</div>' +
        '<div class="mix cat-4" data-order="3">D 3</div>'
    );
});

document.querySelector('.js-insert-multiple-via-elements').addEventListener('click', function() {
    const elements = [1, 2, 3].map(order => {
        const target = document.createElement('div');
        target.className = 'mix cat-4';
        target.dataset.order = String(order);
        target.textContent = `D ${order}`;
        return target;
    });

    mixer.prepend(elements);
});

document.querySelector('.js-api-filter').addEventListener('click', function() {
    mixer.filter('.cat-2');
});

document.querySelector('.js-api-filter-compound').addEventListener('click', function() {
    mixer.filter('.cat-2, .cat-3');
});

document.querySelector('.js-api-sort').addEventListener('click', function() {
    mixer.sort('order:asc');
});

var dataset = [{
    id: '12',
    category: '1'
}];

var dataMixer = mixitup('#sandbox-2', {
    load: {
        dataset: dataset
    },
    data: {
        uidKey: 'id',
        dirtyCheck: true
    },
    render: {
        target: function(data) {
            return `<div class="mix cat-${data.category}" id="${data.id}"></div>`;
        }
    }
});

// Supply a new array for each state so the previous dataset stays unchanged.
const expanded = [...dataset, { id: '14', category: '2' }, { id: '2', category: '3' }];
await dataMixer.dataset(expanded);
const reversed = [...expanded].reverse();
await dataMixer.dataset(reversed);
await dataMixer.dataset(reversed.slice(1));
await dataMixer.dataset([...reversed.slice(1), reversed[0]]);
await dataMixer.dataset([reversed[0], { id: '14', category: '4' }]);