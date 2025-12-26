import {defineStore} from "pinia";
import {ref, type Ref} from "vue";
import type {LanguageApiResponse} from "~/classes/language";
import type {SourceApiResponse} from "~/classes/sources/source";
import type {SpellApiResponse} from "~/classes/spells/spell";
import type {CreatureApiResponse} from "~/classes/creatures/creature";
import type {ItemApiResponse} from "~/classes/items/item";
import type {CompanyApiResponse} from "~/classes/company";
import type {CampaignSettingApiResponse} from "~/classes/campaignSetting";
import type {CharacterClass} from "~/classes/characterClasses/characterClass";
import type {CreatureMajorTypeApiResponse} from "~/classes/creatures/creatureMajorType";

export function createCacheStore<T>(
    storeId: string,
    useGetPath: string,
    useListPath: string
) {
    return defineStore(storeId, () => {
        const items = ref({}) as Ref<Record<string, T>>;
        const lists = ref({}) as Ref<Record<string, T[]>>;
        const pendingUrls = ref(new Set<string>());
        const isLoading = computed(() => pendingUrls.value.size > 0);
        const getPath = useGetPath;
        const listPath = useListPath;

        async function get(key: string): Promise<T | undefined> {
            const url = API_URL + '/' + getPath + '/' + key;
            console.log(url);

            // If we have it cached, return it immediately.
            if (has(url)) return items.value[url];

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(url)) return undefined;
            pendingUrls.value.add(url);

            try {
                const { data, error } = await useFetch<T>(url);

                // Handle error or empty response.
                if (error.value || !data.value) {
                    console.error(`Failed to fetch ${url}`, error.value);
                    return undefined;
                }

                // Success - store and return.
                items.value[url] = data.value as T;
                return items.value[url];
            } finally {
                // Make sure to always remove the URL from the pending list.
                pendingUrls.value.delete(url);
            }
        }

        async function list(): Promise<T[] | undefined> {
            const url = API_URL + '/' + listPath;

            // If we have it cached, return it immediately.
            if (has(url)) return lists.value[url];

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(url)) return undefined;
            pendingUrls.value.add(url);

            try {
                const { data, error } = await useFetch<PaginatedApiResponse<T>>(url);

                // Handle error or empty response.
                if (error.value || !data.value) {
                    console.error(`Failed to fetch ${url}`, error.value);
                    return undefined;
                }

                // Success - store and return.
                lists.value[url] = data.value.data as T[];
                return lists.value[url];
            } finally {
                // Make sure to always remove the URL from the pending list.
                pendingUrls.value.delete(url);
            }
        }

        function isFetching(url: string): boolean {
            return pendingUrls.value.has(url);
        }

        function setItem(key: string, item: T) {
            items.value[key] = item;
        }

        function setList(key: string, items: T[]) {
            lists.value[key] = items;
        }

        function has(key: string): boolean {
            return !!items.value[key];
        }

        function clear() {
            items.value = {};
        }

        async function fetch(url: string) {
            // This is the old method with no "isLoading" logic. We will keep it here just until we are sure it's not
            // being used anywhere.
        }

        return {
            getPath,
            items,
            isLoading,
            listPath,
            lists,
            pendingUrls,

            fetch,
            get,
            list,
            setItem,
            setList,
            has
        };
    });
}

export const useCampaignSettingCache = createCacheStore<CampaignSettingApiResponse>(
    'campaign-setting',
    'campaign-setting',
    'campaign-settings'
);
export const useCharacterClassCache = createCacheStore<CharacterClass>(
    'character-class',
    'character-class',
    'character-classes'
);
export const useCompanyCache = createCacheStore<CompanyApiResponse>(
    'company',
    'company',
    'companies'
);
export const useCreatureCache = createCacheStore<CreatureApiResponse>(
    'creature',
    'creature',
    'creatures'
);
export const useCreatureMajorTypeCache = createCacheStore<CreatureMajorTypeApiResponse>(
    'creature-major-type',
    'creature-type',
    'creature-types'
);
export const useItemCache = createCacheStore<ItemApiResponse>(
    'item',
    'item',
    'items'
);
export const useLanguageCache = createCacheStore<LanguageApiResponse>(
    'language',
    'language',
    'languages'
);
export const useMagicSchoolCache = createCacheStore(
    'magic-school',
    'magic-school',
    'magic-schools'
);
export const useSourceCache = createCacheStore<SourceApiResponse>(
    'source',
    'source',
    'sources'
);
export const useSpellCache = createCacheStore<SpellApiResponse>(
    'spell',
    'spell',
    'spells'
);
