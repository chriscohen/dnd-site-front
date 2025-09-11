import { defineStore } from 'pinia';
import type {ISpell} from "~/utils";

type GetSpellQuery = {
    spell: ISpell
};
type GetSpellsQuery = {
    spells: ISpell[]
};
type GetSpellsQueryVariables = Record<string, never>;

export const useSpellStore = defineStore('spell', {
    state: () => ({
        items: [] as ISpell[],
        allLoaded: false,
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: ISpell) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug(slug: string): Promise<ISpell | null> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<ISpell | null>(resolve => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<ISpell | null> {
            const query = gql`
                query {
                    spell(slug: "${slug}") {
                        id
                        slug
                        name
                        editions {
                            id
                            class_levels {
                                character_class
                                level
                            }
                            description
                            domains
                            game_edition
                            higher_level
                            is_default
                            lowest_level
                            material_component_mode
                            material_components {
                                is_consumed
                                item_edition {
                                    item {
                                        id
                                        name
                                        slug
                                    }
                                }
                                quantity
                            }
                            range
                            school {
                                name
                                image {
                                    url
                                }
                            }
                            spell_components
                        }
                    }
                }`;

            const { data, error } =
                await useAsyncQuery<GetSpellQuery, GetSpellsQueryVariables>(query, { slug: slug });

            if  (error.value) {
                return null;
            }
            const item: (ISpell | null) = data.value?.spell ?? null;

            if (item !== null && !this.contains(item?.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            return item;
        },
        getAll(): Promise<ISpell[] | null> {
            return this.allLoaded ?
                new Promise<ISpell[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISpell[] | null> {
            const query = gql`
                query {
                    spells {
                        id
                        slug
                        name
                        editions {
                            id
                            class_levels {
                                character_class
                                level
                            }
                            description
                            domains
                            game_edition
                            higher_level
                            is_default
                            lowest_level
                            material_component_mode
                            material_components {
                                is_consumed
                                item_edition {
                                    item {
                                        id
                                        name
                                        slug
                                    }
                                }
                                quantity
                            }
                            range
                            school {
                                name
                                image {
                                    url
                                }
                            }
                            spell_components
                        }
                    }
                }`;

            const { data, error } = await useAsyncQuery<GetSpellsQuery, GetSpellsQueryVariables>(query);

            if (error.value) {
                return null;
            }
            this.items = [];
            data.value?.spells.forEach((item: ISpell) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
