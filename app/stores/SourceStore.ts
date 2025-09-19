import { defineStore } from 'pinia';

export const useSourceStore = defineStore('source', {
    state: () => ({
        loading: false,
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
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            return fetch(runtimeConfig.public.apiUrl + /source/ + slug + '?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response: Response) => response.json())
                .then((data: ISourcebook) => {
                    if (!this.contains(data.slug)) {
                        this.$patch((state) => state.items.push(data));
                    }
                    return data;
                })
                .catch((e) => {
                    console.error(e);
                    return null;
                })
                .finally(() => {
                    this.loading = false;
                    return null;
                });
        },
        getAll(): Promise<ISourcebook[] | null> {
            return this.allLoaded ?
                new Promise<ISourcebook[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISourcebook[] | null> {
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/sources?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => response.json())
                .then((data: ISourcebook[]) => {
                    this.items = [];
                    data.forEach((item: ISourcebook) => this.$patch((state) => state.items.push(item)))
                })
                .then(() => this.allLoaded = true)
                .catch((e) => console.error(e))
                .finally(() => this.loading = false);

            return this.items;
        }
    }
});
