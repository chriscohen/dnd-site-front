import { defineStore } from 'pinia';
import {useRuntimeConfig} from "#app";
export const useItemStore = defineStore('item', {
    state: () => ({
        loading: false,
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
        getBySlug(slug: string): Promise<IItem | null> {
            const item = this.items.find((item) => item.slug === slug);
            return item === undefined ?
                this.getBySlugFromApi(slug) :
                new Promise<IItem | null>((resolve) => resolve(item));
        },
        async getBySlugFromApi(slug: string): Promise<IItem | null> {
            const runtimeConfig = useRuntimeConfig();
            this.loading = true

            return fetch(runtimeConfig.public.apiUrl + '/item/' + slug + '?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => response.json())
                .then((data: IItem) => this.$patch((state) => state.items.push(data)))
                .catch((e) => {
                    console.error(e);
                    return null;
                })
                .finally(() => {
                    this.loading = false;
                    return null;
                });
        },
        getAll(): Promise<IItem[] | null> {
            return this.allLoaded ?
                new Promise<IItem[]>((resolve) => resolve(this.items)) :
                this.getAllFromApi();
        },
        async getAllFromApi(): Promise<IItem[] | null> {
            console.log('getting all items');
            const runtimeConfig = useRuntimeConfig();
            this.loading = true;

            fetch(runtimeConfig.public.apiUrl + '/items?mode=full', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => response.json())
                .then((data: IItem[]) => {
                    this.items = []
                    data.forEach((item: IItem) => this.$patch((state) => state.items.push(item)));
                })
                .then(() => this.allLoaded = true)
                .catch((e) => console.error(e))
                .finally(() => this.loading = false);

            return this.items;
        }
    }
});
