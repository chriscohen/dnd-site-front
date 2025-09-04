import { defineStore } from 'pinia';

type GetCompanyQuery = {
    company: ICompany
};
type GetCompaniesQuery = {
    companies: ICompany[]
};
type GetCopmaniesQueryVariables = Record<string, never>;

export const useCompanyStore = defineStore('company', {
    state: () => ({
        items: [] as ICompany[],
        allLoaded: false,
    }),
    actions: {
        contains(slug: string): boolean {
            this.items.map((item: ICompany) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        },
        getBySlug(slug: string): Promise<ICompany | null> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<ICompany | null>(resolve => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<ICompany | null> {
            const query = gql`
                query {
                    company(slug: "${slug}") {
                        id
                        slug
                        name
                        logo {
                            mime_type
                            size
                            url
                        }
                        product_url
                        short_name
                        website
                    }
                }`;

            const { data, error } =
                await useAsyncQuery<GetCompanyQuery, GetCopmaniesQueryVariables>(query, { slug: slug });

            if  (error.value) {
                return null;
            }
            const item: (ICompany | null) = data.value?.company ?? null;

            if (item !== null && !this.contains(item?.slug)) {
                this.$patch((state) => {
                    state.items.push(item);
                });
            }

            return item;
        },
        getAll(): Promise<ICompany[] | null> {
            return this.allLoaded ?
                new Promise<ICompany[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ICompany[] | null> {
            const query = gql`
                query {
                    companies {
                        id
                        slug
                        name
                        logo {
                            mimetype
                            size
                            url
                        }
                        product_url
                        short_name
                        website
                    }
                }`;

            const { data, error } = await useAsyncQuery<GetCompaniesQuery, GetCopmaniesQueryVariables>(query);

            if (error.value) {
                return null;
            }
            this.items = [];
            data.value?.companies.forEach((item: ICompany) => {
                this.$patch((state) => {
                    state.items.push(item);
                });
            });
            this.allLoaded = true;
            return this.items;
        }
    }
});
