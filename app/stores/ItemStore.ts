import { createTypedStore } from '~/stores/BaseStore';

export const useItemStore = createTypedStore<IItem>({
    storeName: 'item',
    getEndpoint: 'item',
    listEndpoint: 'items'
});
