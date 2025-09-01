import { defineStore } from 'pinia';

export const useSourcebookStore = defineStore('sourcebook', {
    state: () => ({
        items: [] as ISourcebook[],
        allLoaded: false,
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: ISourcebook) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug(slug: string): Promise<ISourcebook> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<ISourcebook>(resolve => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<ISourcebook> {
            const query = gql`
                query {
                    source(slug: "${slug}") {
                        id
                        slug
                        name
                        description
                        product_code
                        source_type
                        game_edition
                        publication_type
                        cover_image {
                            url
                            collection_name
                            name
                            filename
                            size
                            mime_type
                        }
                        campaign_setting {
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
                            logo {
                                url
                                collection_name
                                name
                                filename
                                size
                                mime_type
                            }
                        }
                        publisher {
                            id
                            slug
                            name
                            short_name
                            website
                        }
                        editions {
                            id
                            source_id
                            name
                            binding
                            pages
                            isbn10
                            isbn13
                            release_date
                            release_date_month_only
                        }
                    }
                }`;

            const { data, error} = await useAsyncQuery(query, { slug: slug });
            const item: (ISourcebook | undefined) = data.value.source;

            if (error.value === undefined && item !== undefined && !this.contains(item.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            return item as ISourcebook;
        },
        getAll(): Promise<ISourcebook[]> {
            return this.allLoaded ?
                new Promise<ISourcebook[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISourcebook[]> {
            const query = gql`
                query {
                    sources {
                        id
                        slug
                        name
                        description
                        product_code
                        source_type
                        game_edition
                        publication_type
                        cover_image {
                            url
                            collection_name
                            name
                            filename
                            size
                            mime_type
                        }
                        campaign_setting {
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
                            logo {
                                url
                                collection_name
                                name
                                filename
                                size
                                mime_type
                            }
                        }
                        publisher {
                            id
                            slug
                            name
                            short_name
                            website
                        }
                        editions {
                            id
                            source_id
                            name
                            binding
                            pages
                            isbn10
                            isbn13
                            release_date
                            release_date_month_only
                        }
                    }
                }`;

            const { data } = await useAsyncQuery(query);

            this.items = [];
            data.value.sources.forEach((item: ISourcebook) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
