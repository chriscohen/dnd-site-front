import { createTypedStore } from '~/stores/BaseStore';

export const useCharacterClassStore = createTypedStore<ICharacterClass>({
    storeName: 'class',
    getEndpoint: 'class',
    listEndpoint: 'classes',
});
