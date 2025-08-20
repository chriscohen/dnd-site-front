import { defineStore } from 'pinia';

export const useSourcebookStore = defineStore('sourcebook', {
    state: () => ({
        items: [] as ISourcebook[],
        allLoaded: false,
    }),
    actions: {
        getBySlug(slug: string): ISourcebook | undefined {
            const item = this.items.find((item: string) => item.slug === slug);
            console.log('search result', item);
            return item === undefined ? this.getBySlugFromApi(slug) : item;
        },
        async getBySlugFromApi(slug: string): Promise<ISourcebook> {
            const query = gql`
                query {
                    source(slug: "${slug}") {
                        id
                        slug
                        name
                        product_code
                        source_type
                        game_edition
                        cover_image
                    }
                }`;

            const { data, error} = await useAsyncQuery(query, { slug: slug });

            if (error.value === undefined && data.value.source !== undefined) {
                console.log('patching');
                this.$patch((state) => {
                    state.items.push(data.value.source);
                    console.log('pushed "' + data.value.source.name + '" to state');
                });
            }

            return data.value.source;
        },
        getAll(): Promise<ISourcebook[]> {
            return this.allLoaded ? this.byId : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISourcebook[]> {
            const query = gql`
                query {
                    sources {
                        id
                        slug
                        name
                        product_code
                        source_type
                        game_edition
                        cover_image
                    }
                }`;

            const { data } = await useAsyncQuery(query);
            data.value.sources.forEach((item: ISourcebook) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
        }
    }
});
