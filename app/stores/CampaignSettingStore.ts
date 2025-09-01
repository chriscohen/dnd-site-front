import { defineStore } from 'pinia';
import type {ICampaignSetting} from "~/utils";

export const useCampaignSettingStore = defineStore('campaignSetting', {
    state: () => ({
        items: [] as ICampaignSetting[],
        allLoaded: false
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: ICampaignSetting) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug(slug: string): ICampaignSetting | undefined {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ? this.getBySlugFromApi(slug) : item;
        },
        async getBySlugFromApi(slug: string): Promise<ICampaignSetting> {
            const query = gql`
                query {
                    campaignSetting(slug: "${slug}") {
                        id
                        slug
                        name
                        short_name
                        publisher {
                            id
                            slug
                            name
                            short_name
                            website
                        }
                        publication_type
                        logo
                    }
                }`;

            const { data, error} = await useAsyncQuery(query, { slug: slug });
            const item: (ICampaignSetting | undefined) = data.value.campaignSetting;

            if (error.value === undefined && item !== undefined && !this.contains(item.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            console.log('item', item);

            return item as ICampaignSetting;
        },
        getAll(): ICampaignSetting[] {
            return this.allLoaded ? this.items : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ICampaignSetting[]> {
            const query = gql`
                query {
                    campaignSettings {
                        id
                        slug
                        name
                        short_name
                        publication_type
                        logo {
                            url
                            collection_name
                            name
                            filename
                            size
                            mime_type
                        }
                    }
                }`;

            const { data } = await useAsyncQuery(query);
            this.items = [];

            data.value.campaignSettings.forEach((item: ICampaignSetting) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
