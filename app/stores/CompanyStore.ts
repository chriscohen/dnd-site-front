import { createTypedStore } from '~/stores/BaseStore';

export const useCompanyStore = createTypedStore<ICompany>({
    storeName: 'company',
    getEndpoint: 'company',
    listEndpoint: 'companies'
});
