import { createTypedStore } from './BaseStore';

export const useSpellStore = createTypedStore<ISpell>({
    storeName: 'spell',
    getEndpoint: 'spell',
    listEndpoint: 'spells'
});
