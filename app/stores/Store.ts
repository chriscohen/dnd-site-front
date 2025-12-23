import {defineStore} from "pinia";
import {ref, type Ref} from "vue";

export function createCacheStore<T>(storeId: string) {
    return defineStore(storeId, () => {
        const items = ref({}) as Ref<Record<string, T | T[]>>;

        const pendingUrls = ref(new Set<string>());

        const isLoading = computed(() => pendingUrls.value.size > 0);

        async function get(key: string): Promise<T | T[] | undefined> {
            console.log(key);
            // If we have it cached, return it immediately.
            if (has(key)) return items.value[key];

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(key)) return undefined;

            pendingUrls.value.add(key);

            try {
                const { data, error } = await useFetch<PaginatedApiResponse<T>>(key);

                // Handle error or empty response.
                if (error.value || !data.value) {
                    console.error(`Failed to fetch ${key}`, error.value);
                    return undefined;
                }

                // Success - store and return.
                items.value[key] = data.value.data as T;
                return items.value[key];
            } finally {
                // Make sure to always remove the URL from the pending list.
                pendingUrls.value.delete(key);
            }
        }

        function isFetching(url: string): boolean {
            return pendingUrls.value.has(url);
        }

        function set(key: string, item: T | T[]) {
            items.value[key] = item;
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
            items,
            isFetching,
            isLoading,
            pendingUrls,

            fetch,
            get,
            set,
            has,
            clear
        };
    });
}

export const useCampaignSettingCache = createCacheStore('campaign-setting');
export const useCharacterClassCache = createCacheStore('character-class');
export const useCompanyCache = createCacheStore('company');
export const useItemCache = createCacheStore('item');
export const useLanguageCache = createCacheStore<LanguageApiResponse>('language');
export const useMagicSchoolCache = createCacheStore('magic-school');
export const useSourcebookCache = createCacheStore<SourcebookApiResponse>('sourcebook');
export const useCreatureCache = createCacheStore<ISpecies>('creature');
export const useSpellCache = createCacheStore<SpellApiResponse>('spell');
