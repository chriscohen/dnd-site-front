import { defineStore } from 'pinia';
import type {ICampaignSetting} from "~/utils";
import type {TypedQueryDocumentNode} from "graphql/utilities";

type GetCampaignSettingQuery = {
    campaignSetting: ICampaignSetting
}
type GetCampaignSettingsQuery = {
    campaignSettings: ICampaignSetting[]
};
type GetCampaignSettingsQueryVariables = Record<string, never>;

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
        getBySlug(slug: string): Promise<ICampaignSetting | null> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<ICampaignSetting>((resolve) => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<ICampaignSetting | null> {
            const query: TypedQueryDocumentNode<GetCampaignSettingQuery, GetCampaignSettingsQueryVariables> = gql`
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

            const { data, error } =
                await useAsyncQuery<GetCampaignSettingsQuery, GetCampaignSettingsQueryVariables>(query, { slug: slug });

            if  (error.value) {
                return null;
            }
            const item: (ICampaignSetting | null) = data.value?.campaignSetting ?? null;

            if (item !== null && !this.contains(item?.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            return item;
        },
        async getAll(): Promise<ICampaignSetting[] | null> {
            return this.allLoaded ?
                new Promise<ICampaignSetting[]>((resolve) => resolve(this.items)) :
                this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ICampaignSetting[] | null> {
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

            const { data, error } = await useAsyncQuery(query);

            if (error.value) {
                return null;
            }
            this.items = [];

            data.value.campaignSettings.forEach((item: ICampaignSetting) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            console.log('returning');
            return this.items;
        }
    }
});
