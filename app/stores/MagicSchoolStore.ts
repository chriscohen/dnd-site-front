import { defineStore } from 'pinia';

type GetMagicSchoolQuery = {
    magicSchool: IMagicSchool
};
type GetMagicSchoolsQuery = {
    magicSchools: IMagicSchool[]
};
type GetMagicSchoolsQueryVariables = Record<string, never>;

export const useMagicSchoolStore = defineStore('magicSchool', {
    state: () => ({
        items: [] as IMagicSchool[],
        allLoaded: false,
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: IMagicSchool) => {
                if (item.id === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug: (slug: string): Promise<IMagicSchool | null> => {
            const item = this.items.find((item) => item.id === slug);
            return item === undefined ?
                this.getBy :
                new Promise<IMagicSchool>((resolve) => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<IMagicSchool | null> {
            const query = gql`
                query {
                    magicSchool(id: "${slug}") {
                        id
                        name
                        image {
                            id
                            collection_name
                            filename
                            mime_type
                            name
                            size
                            url
                        }
                    }
                }`;

            const { data, error } =
                await useAsyncQuery<GetMagicSchoolQuery, GetMagicSchoolsQueryVariables>(query, { id: slug });

            if (error.value) {
                return new Promise<IMagicSchool | null>((resolve) => resolve(null));
            }
            const item: (IMagicSchool | null) = data.value?.magicSchool ?? null;

            if (item !== null && !this.contains(item.id)) {
                this.$patch((state) => {
                    state.items.push(item);
                })
            }

            return item;
        },
        getAll(): Promise<IMagicSchool[] | null> {
            return this.allLoaded ?
                new Promise<IMagicSchool[]>((resolve) => resolve(this.items)) :
                this.getAllFromApi();
        },
        async getAllFromApi(): Promise<IMagicSchool[] | null> {
            const query = gql`
                query {
                    magicSchools {
                        id
                        name
                        image {
                            id
                            collection_name
                            filename
                            mime_type
                            name
                            size
                            url
                        }
                    }
                }`;

            const { data, error } = await useAsyncQuery<GetMagicSchoolsQuery, GetMagicSchoolsQueryVariables>(query);

            if (error.value) {
                return null;
            }

            this.items = [];
            data.value?.magicSchools.forEach((item: IMagicSchool) => {
                this.$patch((state) => {
                    state.items.push(item);
                })
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
