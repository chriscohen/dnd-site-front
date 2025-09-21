import { defineStore } from 'pinia';
import { usePersistedStore } from "#imports";

export const useSpellStore = defineStore('spell', () => {
    const loading = ref(false);
    const items = ref<ISpell[]>([]);
    const allLoaded = ref(false);
    const persisted = usePersistedStore();

    function contains(slug: string) {
        items.value.map((item: ISpell) => {
            if (item.slug === slug) {
                return true;
            }
        });
        return false;
    }

    async function getBySlug(slug: string): Promise<ISpell | null> {
        const item = items.value.find((item: ISpell) => item.slug === slug);
        return item === undefined ?
            getBySlugFromApi(slug) :
            new Promise<ISpell | null>(resolve => resolve(item));
    }

    async function getBySlugFromApi(slug: string): Promise<ISpell | null> {
        const runtimeConfig = useRuntimeConfig();
        loading.value = true;

        return fetch(runtimeConfig.public.apiUrl + /spell/ + slug + '?mode=full', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((response: Response) => response.json())
            .then((data: ISpell) => {
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
    async function getAll(noCache: boolean = false): Promise<ISpell[] | null> {
        return allLoaded.value && !noCache ?
            new Promise<ISpell[]>((resolve) => resolve(items.value))
            : getAllFromApi();
    }

    async function getAllFromApi(): Promise<ISpell[] | null> {
        const runtimeConfig = useRuntimeConfig();
        loading.value = true;

        const url = runtimeConfig.public.apiUrl + '/spells?' + persisted.getEditionsQueryString +
            '&mode=full';

        fetch(url, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((response) => response.json())
            .then((data: ISpell[]) => {
                items.value = [];
                data.forEach((item: ISpell) => items.value.push(item))
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
