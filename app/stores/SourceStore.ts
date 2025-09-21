import { createTypedStore } from '~/stores/BaseStore';

export const useSourceStore = createTypedStore<ISourcebook>({
    storeName: 'source',
    getEndpoint: 'source',
    listEndpoint: 'sources',
});
