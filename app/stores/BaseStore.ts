import type { StoreDefinition } from "pinia";
import type {IQueryString} from "~/utils";
import {usePersistedStore} from "#imports";

type TypedStoreProps = {
    storeName: string
    getEndpoint: string
    listEndpoint: string
};

export function createTypedStore<T>(props: TypedStoreProps): StoreDefinition {
    // For cache entries, we will store what query string was used, and what the result was.
    type CacheEntry = {
        query: string
        result: T|T[]
    }

    return defineStore(props.storeName, () => {
        const short = ref<T[]>([]);
        const teaser = ref<T[]>([]);
        const full = ref<T[]>([]);
        const loading = ref<boolean>(false);
        const error = ref<Error | null>(null);
        const cache = ref<CacheEntry[]>([]);
        const persisted = usePersistedStore();

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

        function contains(slug: string, mode: RenderMode): boolean {
            const store = getStore(mode);

            store.value.map((item: T) => {
                if (item.slug === slug) {
                    return true;
                }
            });
            return false;
        }

        function isLoading(): boolean {
            return loading.value;
        }

        function getUrl(endpoint: string, slug?: string | null, qs: IQueryString = {}): string {
            const runtimeConfig = useRuntimeConfig();
            let url = runtimeConfig.public.apiUrl + '/' + endpoint;

            if (slug) {
                url = url + '/' + slug;
            }

            const mapped = Object.entries(qs).map(
                ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
            );

            return url + '?' + mapped.join('&');
        }

        function getBySlug(slug: string, mode: RenderMode = RenderMode.SHORT): T | null {
            const store = getStore(mode);

            const url = getUrl(
                props.getEndpoint,
                slug,
                {
                    editions: persisted.getEditionsQueryString,
                    mode: mode
                },
            );

            return fromCache(url) ??
                store.value.find((item: T) => item.slug === slug) ??
                getBySlugFromApi(url, slug, mode);
        }

        async function getBySlugFromApi(
            url: string,
            slug: string,
            mode: RenderMode = RenderMode.SHORT
        ): Promise<T | null> {
            loading.value = true;
            const store = getStore(mode);

            await fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response: Response) => response.json())
                .then((data: T) => {
                    if (!contains(data.slug, mode)) {
                        store.value.push(data);
                    }
                    return data;
                })
                .then((data: T) => toCache(url, data))
                .catch((e) => {
                    console.error(e);
                    error.value = e;
                    return null;
                })
                .finally(() => {
                    loading.value = false;
                    return null;
                });
        }

        function getAll(mode: RenderMode) {
            const url = getUrl(
                props.listEndpoint,
                null,
                {
                    mode: mode,
                    editions: persisted.getEditionsQueryString
                },
            );

            return fromCache(url) ?? getAllFromApi(url, mode);
        }

        async function getAllFromApi(url: string, mode: RenderMode) {
            loading.value = true;
            const store = getStore(mode);

            await fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => response.json())
                .then((data: T[]) => {
                    store.value = [];
                    data.forEach((item: T) => store.value.push(item))
                    return data;
                })
                .then((data: T[]) => toCache(url, data))
                .catch((e) => {
                    console.error(e);
                    error.value = e;
                    return null;
                })
                .finally(() => loading.value = false);
        }

        function fromCache(query: string): T | null {
            cache.value.forEach((item: CacheEntry) => {
                if (item.query === query) {
                    console.log('[CACHE] hit: ' + query);
                    return item;
                }
            });

            console.log('[CACHE] miss: ' + query);
            return null;
        }

        function removeFromCache(query: string): boolean {
            const cachedItem = fromCache(query);

            if (!cachedItem) {
                // It's not already in the cache.
                return false;
            } else {
                const index = cache.value.indexOf(cachedItem);

                // If found in the cache, splice to remove it.
                if (index !== -1) {
                    cache.value.splice(index, 1);
                    return true;
                }
            }

            return false;
        }

        function toCache(query: string, result: T[]) {
            const cachedItem = fromCache(query);

            if (!cachedItem) {
                // Add a new item.
                cache.value.push({
                    query: query,
                    result: result
                });
            } else {
                // Replace the existing item.
                const index = cache.value.indexOf(cachedItem);
                cache.value[index] = {
                    query: query,
                    result: result
                };
            }
        }

        return {
            short,
            teaser,
            full,
            cache,
            isLoading,
            contains,
            getAll,
            getAllFromApi,
            getBySlug,
            getBySlugFromApi
        };
    });
}
