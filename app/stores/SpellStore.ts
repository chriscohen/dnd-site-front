import { defineStore } from 'pinia';

export const useSpellStore = defineStore('spell', {
    state: () => ({
        loading: false,
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
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/spell/' + slug + '?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then(response => response.json())
                .then((data: ISpell) => {
                    if (!this.contains(data.slug)) {
                        this.$patch((state) => state.items.push(data))
                    }
                    return data;
                })
                .catch((e) => {
                    console.error(e);
                    return null;
                })
                .finally(() => this.loading = false);
        },
        getAll(): Promise<ISpell[] | null> {
            return this.allLoaded ?
                new Promise<ISpell[]>((resolve) => resolve(this.items))
                : this.getAllFromApi();
        },
        async getAllFromApi(): Promise<ISpell[] | null> {
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/spells?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then(response => response.json())
                .then((data: ISpell[]) => {
                    this.items = [];
                    data.forEach((item: ISpell) => this.$patch((state) => state.items.push(item)))
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
