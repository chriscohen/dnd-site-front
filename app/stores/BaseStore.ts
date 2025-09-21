import type { StoreDefinition } from "pinia";
import type {IQueryString} from "~/utils";
import {usePersistedStore} from "#imports";

type TypedStoreProps = {
    storeName: string
    getEndpoint: string
    listEndpoint: string
};

export function createTypedStore<T>(props: TypedStoreProps): StoreDefinition {
    return defineStore(props.storeName, () => {
        const items = ref<T[]>([]);
        const loading = ref<boolean>(false);
        const error = ref<Error | null>(null);
        const persisted = usePersistedStore();

        function contains(slug: string): boolean {
            items.value.map((item: T) => {
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

            qs.mode = 'full';
            const mapped = Object.entries(qs).map(
                ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
            );

            return url + '?' + mapped.join('&');
        }

        async function getBySlug(slug: string): Promise<T | null> {
            const item = items.value.find((item: T) => item.slug === slug);
            return item === undefined ?
                getBySlugFromApi(slug) :
                new Promise<T | null>(resolve => resolve(item));
        }

        async function getBySlugFromApi(slug: string): Promise<T | null> {
            loading.value = true;
            const url = getUrl(
                props.getEndpoint,
                slug,
                { editions: persisted.getEditionsQueryString },
            );

            return fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response: Response) => response.json())
                .then((data: T) => {
                    if (!contains(data.slug)) {
                        items.value.push(data);
                    }
                    return data;
                })
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

        async function getAll(noCache: boolean = false): Promise<T[] | null> {
            return getAllFromApi();
        }

        async function getAllFromApi(): Promise<T[] | null> {
            loading.value = true;
            const url = getUrl(
                props.listEndpoint,
                null,
                { editions: persisted.getEditionsQueryString },
            )

            return fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
            })
                .then((response) => response.json())
                .then((data: T[]) => {
                    items.value = [];
                    data.forEach((item: T) => items.value.push(item))
                    return items;
                })
                .catch((e) => {
                    console.error(e);
                    error.value = e;
                    return null;
                })
                .finally(() => loading.value = false);
        }

        return {
            items,
            isLoading,
            contains,
            getAll,
            getAllFromApi,
            getBySlug,
            getBySlugFromApi
        };
    });
}
