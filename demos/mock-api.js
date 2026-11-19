// In-memory stand-in for the dataset demos' asynchronous data source.
export default class Api {
    constructor(items) {
        this.items = items;
    }

    async get({color, $sort_by: key, $order: order}) {
        const matches = this.items.filter(item => color === 'all' || item.color === color);
        return matches.sort((a, b) => {
            const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
            return order === 'desc' ? -comparison : comparison;
        });
    }
}