import { defineStore } from 'pinia';

type GetSourceQuery = {
    source: ISourcebook
};
type GetSourcesQuery = {
    sources: ISourcebook[]
};
type GetSourcesQueryVariables = Record<string, never>;

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
        getBySlug(slug: string): Promise<ISourcebook | null> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<ISourcebook | null>(resolve => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<ISourcebook | null> {
            const query = gql`
                query {
                    source(slug: "${slug}") {
                        id
                        slug
                        name
                        description
                        product_code
                        product_ids {
                            origin {
                                id
                                slug
                                name
                                logo {
                                    url
                                }
                            }
                            product_id
                            url
                        }
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

            const { data, error } =
                await useAsyncQuery<GetSourceQuery, GetSourcesQueryVariables>(query, { "game_edition": ["2"] });

            if  (error.value) {
                return null;
            }
            const item: (ISourcebook | null) = data.value?.source ?? null;

            if (item !== null && !this.contains(item?.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            return item;
        },
        getAll(): Promise<ISourcebook[] | null> {
            return this.allLoaded ?
                new Promise<ISourcebook[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISourcebook[] | null> {
            const query = gql`
                query sources($game_edition: [String]) {
                    sources(
                        game_edition: $game_edition
                    ) {
                        id
                        slug
                        name
                        description
                        product_code
                        product_ids {
                            origin {
                                id
                                slug
                                name
                                logo {
                                    url
                                }
                            }
                            product_id
                            url
                        }
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
                },`;

            const { data, error } = await useAsyncQuery<GetSourcesQuery, GetSourcesQueryVariables>(query);

            if (error.value) {
                return null;
            }
            this.items = [];
            data.value?.sources.forEach((item: ISourcebook) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
