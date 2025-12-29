import {defineStore, skipHydrate} from "pinia";
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

interface GetProps {
    key: string
    params?: Record<string, string>
    disableSSR?: boolean
}
interface ListProps {
    params?: Record<string, string>
    disableSSR?: boolean
}

/**
 *
 * @param storeId
 * @param useGetPath  Relative to the API base URL. Should contain {key} where the key of the item is to be replaced.
 * @param useListPath
 */
export function createCacheStore<T>(
    storeId: string,
    useGetPath: string,
    useListPath?: string
) {
    return defineStore(storeId, () => {
        const getPath = useGetPath;
        const getResponses = ref({}) as Ref<Record<string, T>>;
        const isLoading = computed(() => pendingUrls.value.size > 0);
        const listItems = ref([]) as Ref<T[]>;
        const lastUrl = ref<string>('');
        const nextUrl = ref<string | null>(null);

        const pendingUrls = ref(new Set<string>());

        const hasItems = computed(() => listItems.value.length > 0);
        const isFinished = computed(() => nextUrl.value === null);

        async function get(props: GetProps = { key: '' }): Promise<T | undefined> {
            if (props.disableSSR && !import.meta.client) return; // Force client-side only.
            const url = getUrl(useGetPath, props.key, props.params);

            // If we have it cached, return it immediately.
            if (has(url)) return getResponses.value[url];

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(url)) return undefined;
            pendingUrls.value.add(url);

            try {
                const data = await $fetch<T>(url);

                // Success - store and return.
                getResponses.value[url] = data as T;
                return getResponses.value[url];
            } catch (error: any) {
                console.error(`Failed to fetch ${url}`, error.value);
                return undefined;
            } finally {
                // Make sure to always remove the URL from the pending loadMore.
                pendingUrls.value.delete(url);
            }
        }

        async function loadMore(props: ListProps = {}) {
            if (props.disableSSR && !import.meta.client) return; // Force client-side only.
            if (!useListPath) throw new Error('Cannot use loadMore() with no list URL (useListPath)');

            if (nextUrl.value === null) {
                nextUrl.value = getUrl(useListPath, undefined, props.params);
            }

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(nextUrl.value)) return;
            pendingUrls.value.add(nextUrl.value);

            try {
                const data = await $fetch<PaginatedApiResponse<T>>(nextUrl.value);

                // Success - append data.
                listItems.value.push(...data.data as T[]);

                // Update the pointer URL to the next page.
                lastUrl.value = nextUrl.value;
                nextUrl.value = data.next_page_url;
            } catch (error) {
                console.error(`Failed to fetch ${nextUrl.value}`, error);
            } finally {
                // Make sure to always remove the URL from the pending loadMore.
                pendingUrls.value.delete(lastUrl.value);
            }
        }

        /**
         * Build a URL for the given path and query string parameters.
         *
         * @param path   The relative path containing a replacement key, for example, "creature/{key}"
         * @param key    The key to replace in the path.
         * @param params A map of query string parameters as key/value pairs.
         */
        function getUrl(path: string, key?: string, params: Record<string, string> = {}): string {
            const myPath = path.replace('{key}', key ?? '');
            return API_URL + '/' + myPath + '?' + Object.entries(params).map(([key, value]) => {
                return key + '=' + value;
            }).join('&');
        }

        function setItem(key: string, item: T) {
            getResponses.value[key] = item;
        }

        function setList(key: string, items: T[]) {
            listItems.value.push(...items);
        }

        function has(key: string): boolean {
            return !!getResponses.value[key];
        }

        function clear() {
            getResponses.value = {};
        }

        return {
            getPath,
            getResponses,
            isFinished,
            isLoading,
            listItems,
            nextUrl,
            // Don't allow the server to hydrate the pending URLs, because this could happen after the server initiated
            // a request, but before it received a response, leading to a "stuck" pendingUrl on the client with no
            // request being made.
            pendingUrls: skipHydrate(pendingUrls),

            get,
            has,
            hasItems,
            loadMore,
            setItem,
            setList,
        };
    });
}

export const useCampaignSettingCache = createCacheStore<CampaignSettingApiResponse>(
    'campaign-setting',
    'campaign-setting/{key}',
    'campaign-settings'
);
export const useCharacterClassCache = createCacheStore<CharacterClass>(
    'character-class',
    'character-class/{key}',
    'character-classes'
);
export const useCompanyCache = createCacheStore<CompanyApiResponse>(
    'company',
    'company/{key}',
    'companies'
);
export const useCreatureCache = createCacheStore<CreatureApiResponse>(
    'creature',
    'creature/{key}',
    'creatures'
);
export const useCreatureMajorTypeCache = createCacheStore<CreatureMajorTypeApiResponse>(
    'creature-major-type',
    'creature-type/{key}',
    'creature-types'
);
export const useItemCache = createCacheStore<ItemApiResponse>(
    'item',
    'item/{key}',
    'items'
);
export const useLanguageCache = createCacheStore<LanguageApiResponse>(
    'language',
    'language/{key}',
    'languages'
);
export const useMagicSchoolCache = createCacheStore(
    'magic-school',
    'magic-school/{key}',
    'magic-schools'
);
export const useSourceCache = createCacheStore<SourceApiResponse>(
    'source',
    'source/{key}',
    'sources'
);

export const useSourceContentsCache = createCacheStore(
    'source-contents',
    'source/{key}/contents'
);
export const useSpellCache = createCacheStore<SpellApiResponse>(
    'spell',
    'spell/{key}',
    'spells'
);
