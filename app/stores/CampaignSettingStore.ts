import { createTypedStore } from '~/stores/BaseStore';

export const useCampaignSettingStore = createTypedStore<ICampaignSetting>({
    storeName: 'campaign-setting',
    getEndpoint: 'campaign-setting',
    listEndpoint: 'campaign-settings'
});
