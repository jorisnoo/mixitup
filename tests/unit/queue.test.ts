import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';
import * as dom from '../mock/dom';
import JSONDataset from '../mock/dataset.json';

const dataset = JSONDataset.map(data => new dom.Item(data));

describe('mixitup.Mixer', () => {
    describe('Queue', () => {
        it('should warn if too many multimix operations are pushed into the queue', async () => {
            const container = dom.getContainer();
            const mixer = mixitup(container, {
                debug: {
                    fauxAsync: true
                },
                animation: {
                    duration: 200
                }
            });

            await Promise.all([
                mixer.hide(),
                mixer.show(),
                mixer.hide(),
                mixer.show(),
                mixer.hide()
            ]);
        });

        it('should warn if too many dataset operations are pushed into the queue', async () => {
            const container = dom.getContainer();

            const mixer = mixitup(container, {
                debug: {
                    fauxAsync: true
                },
                animation: {
                    duration: 200
                },
                data: {
                    uidKey: 'id'
                },
                load: {
                    dataset: dataset
                }
            } as any);

            await Promise.all([
                mixer.dataset([]),
                mixer.dataset(dataset),
                mixer.dataset([]),
                mixer.dataset(dataset),
                mixer.dataset([])
            ]);
        });
    });
});
