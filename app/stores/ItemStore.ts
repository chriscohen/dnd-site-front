import { defineStore } from 'pinia';

export const useItemStore = defineStore('item', {
    state: () => ({
        items: [] as IItem[],
        allLoaded: false,
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: IItem) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug(slug: string): IItem | undefined {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ? this.getBySlugFromApi(slug) : item;
        },
        async getBySlugFromApi(slug: string): Promise<IItem> {
            const query = gql`
                query {
                    item(slug: "${slug}") {
                        id
                        slug
                        name
                        category {
                            id
                            slug
                            name
                            entity_type
                            parent {
                                id
                                slug
                                name
                                parent {
                                    id
                                    slug
                                    name
                                }
                            }
                            image {
                                url
                                name
                                collection_name
                                filename
                            }
                        }
                        editions {
                            id
                            item_id
                            game_edition
                            description
                            price
                            quantity
                            weight
                            source {
                                id
                                slug
                                name
                            }
                        }
                    }
                }`;

            const { data, error} = await useAsyncQuery(query, { slug: slug });
            const item: (IItem | undefined) = data.value.item;

            if (error.value === undefined && item !== undefined && !this.contains(item.slug)) {
                this.$patch((state) => {
                    console.log('item: ', item);
                    state.items.push(item);
                });
            }

            return item as IItem;
        },
        getAll(): IItem[] {
            return this.allLoaded ? this.items : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<IItem[]> {
            const query = gql`
                query {
                    items {
                        id
                        slug
                        name
                        category {
                            id
                            slug
                            name
                            image {
                                url
                            }
                        }
                        editions {
                            id
                            item_id
                            game_edition
                            description
                            price
                            quantity
                            weight
                            source {
                                id
                                slug
                                name
                            }
                        }
                    }
                }`;

            const { data } = await useAsyncQuery(query);

            this.items = [];
            data.value.items.forEach((item: IItem) => {
                this.$patch((state) => {
                    this.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
