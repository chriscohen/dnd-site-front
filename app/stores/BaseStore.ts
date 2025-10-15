import type { StoreDefinition } from "pinia";

type TypedStoreProps = {
    storeName: string
    getEndpoint: string
    listEndpoint: string
};

export function createTypedStore<T>(props: TypedStoreProps): StoreDefinition {
    return defineStore(props.storeName, () => {
        const short = ref<T[]>([]);
        const teaser = ref<T[]>([]);
        const full = ref<T[]>([]);
        const latest = ref<T | undefined>();

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

        function contains (search: T, mode: RenderMode): boolean {
            const store = getStore(mode);
            const result = store.value.find((item: T) => search == item);
            return result != undefined;
        }

        function empty(mode: RenderMode): boolean {
            const store = getStore(mode);
            return store.value.length == 0;
        }

        function getBySlug(slug: string, mode: RenderMode = RenderMode.SHORT): T | undefined {
            const store = getStore(mode);
            return store.value.find((item: T) => item.slug === slug);
        }

        function getAll (mode: RenderMode) {
            const store = getStore(mode);
            return store.value;
        }

        function getLatest(): T | undefined {
            return latest.value;
        }

        function add(item: T, mode: RenderMode): void {
            const store = getStore(mode);
            const existingIndex = store.value.indexOf(item);

            if (existingIndex == -1) {
                store.value.push(item);
            } else {
                store.value.splice(existingIndex, 1, item);
            }

            latest.value = item;
        }

        function replace(items: T[], mode: RenderMode): void {
            const store = getStore(mode);
            store.value = items;
        }

        return {
            short,
            teaser,
            full,
            add,
            empty,
            getAll,
            getBySlug,
            contains,
            getLatest,
            replace
        };
    });
}
