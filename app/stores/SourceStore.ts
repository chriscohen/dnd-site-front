import {defineStore} from 'pinia';
import {usePersistedStore} from "#imports";

export const useSourceStore = defineStore('source', () => {
    const loading = ref(false);
    const items = ref<ISourcebook[]>([]);
    const allLoaded = ref(false);
    const persisted = usePersistedStore();

    function contains(slug: string) {
        items.value.map((item: ISourcebook) => {
            if (item.slug === slug) {
                return true;
            }
        });
        return false;
    }

    async function getBySlug(slug: string): Promise<ISourcebook | null> {
        const item = items.value.find((item: ISourcebook) => item.slug === slug);
        return item === undefined ?
            getBySlugFromApi(slug) :
            new Promise<ISourcebook | null>(resolve => resolve(item));
    }

    async function getBySlugFromApi(slug: string) {
        const runtimeConfig = useRuntimeConfig();
        loading.value = true;

        return fetch(runtimeConfig.public.apiUrl + /source/ + slug + '?mode=full', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((response: Response) => response.json())
            .then((data: ISourcebook) => {
                if (!contains(data.slug)) {
                    items.value.push(data);
                }
                return data;
            })
            .catch((e) => {
                console.error(e);
                return null;
            })
            .finally(() => {
                loading.value = false;
                return null;
            });
    }

    async function getAll(noCache: boolean = false): Promise<ISourcebook[] | null> {
        return allLoaded.value && !noCache ?
            new Promise<ISourcebook[]>((resolve) => resolve(items.value))
            : getAllFromApi();
    }

    async function getAllFromApi(): Promise<ISourcebook[] | null> {
        const runtimeConfig = useRuntimeConfig();
        loading.value = true;

        const url = runtimeConfig.public.apiUrl + '/sources?' + persisted.getEditionsQueryString +
            '&mode=full';

        fetch(url, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((response) => response.json())
            .then((data: ISourcebook[]) => {
                items.value = [];
                data.forEach((item: ISourcebook) => items.value.push(item))
            })
            .then(() => allLoaded.value = true)
            .catch((e) => console.error(e))
            .finally(() => loading.value = false);

        return items.value;
    }

    return {
        allLoaded,
        items,
        loading,
        contains,
        getAll,
        getAllFromApi,
        getBySlug,
        getBySlugFromApi
    };
});
