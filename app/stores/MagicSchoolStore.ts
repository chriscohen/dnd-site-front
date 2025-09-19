import { defineStore } from 'pinia';

export const useMagicSchoolStore = defineStore('magicSchool', {
    state: () => ({
        loading: false,
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
                this.getBySlugFromApi(slug) :
                new Promise<IMagicSchool>((resolve) => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<IMagicSchool | null> {
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/school/' + slug + '?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response: Response) => response.json())
                .then((data: IMagicSchool) => {
                    if (!this.contains(data.id)) {
                        this.$patch((state) => state.items.push(data))
                    }
                })
                .catch((e) => {
                    console.error(e);
                    return null;
                })
                .finally(() => this.loading = false);
        },
        getAll(): Promise<IMagicSchool[] | null> {
            return this.allLoaded ?
                new Promise<IMagicSchool[]>((resolve) => resolve(this.items)) :
                this.getAllFromApi();
        },
        async getAllFromApi(): Promise<IMagicSchool[] | null> {
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/schools?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response: Response) => response.json())
                .then((data: IMagicSchool[]) => {
                    this.items = [];
                    data.forEach((item: IMagicSchool) => this.$patch((state) => state.items.push(item)))
                })
                .then(() => this.allLoaded = true)
                .catch((e) => {
                    console.error(e);
                    return null;
                })
                .finally(() => this.loading = false);
        }
    }
});
