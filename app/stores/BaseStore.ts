import type { StoreDefinition } from "pinia";

type TypedStoreProps = {
    storeName: string
    getEndpoint: string
    listEndpoint: string
};

export function createTypedStore<T>(props: TypedStoreProps): StoreDefinition {
    // For cache entries, we will store what query string was used, and what the result was.


    return defineStore(props.storeName, () => {
        const short = ref<T[]>([]);
        const teaser = ref<T[]>([]);
        const full = ref<T[]>([]);

        function getStore(mode: RenderMode) {
            switch (mode) {
                default:
                case RenderMode.SHORT:
                    return short;
                case RenderMode.TEASER:
                    return teaser;
                case RenderMode.FULL:
                    return full;
            }
        }

        function contains (slug: string, mode: RenderMode): boolean {
            const store = getStore(mode);

            store.value.map((item: T) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        }

        const isLoading: boolean = computed(() => loading.value);

        function getBySlug(slug: string, mode: RenderMode = RenderMode.SHORT): T | null {
            const store = getStore(mode);
            return store.value.find((item: T) => item.slug === slug);
        }

       function getAll (mode: RenderMode) {
           const store = getStore(mode);
           return store.value;
       }

        return {
            short,
            teaser,
            full,
            getAll,
            getBySlug,
            contains
        };
    });
}
