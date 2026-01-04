import {defineStore, skipHydrate} from "pinia";
import {ref, type Ref} from "vue";
import type {LanguageApiResponse} from "~/classes/language";
import type {SourceApiResponse} from "~/classes/sources/source";
import type {SpellApiResponse} from "~/classes/spells/spell";
import type {CreatureTypeApiResponse} from "~/classes/creatures/creatureType";
import type {ItemApiResponse} from "~/classes/items/item";
import type {CompanyApiResponse} from "~/classes/company";
import type {CampaignSettingApiResponse} from "~/classes/campaignSetting";
import type {CharacterClass} from "~/classes/characterClasses/characterClass";
import type {CreatureMainTypeApiResponse} from "~/classes/creatures/creatureMainType";
import type {PersonApiResponse} from "~/classes/person";

interface GetProps {
    disableSSR?: boolean
    key: string
    params?: Record<string, string>
    path?: string
}
interface ListProps {
    disableSSR?: boolean
    key?: string
    params?: Record<string, string>
    path?: string
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
        const runtime = useRuntimeConfig();
        const getPath = useGetPath;
        const getResponses = ref({}) as Ref<Record<string, T>>;
        const listResponses = ref({}) as Ref<Record<string, T[]>>;
        const isLoading = computed(() => pendingUrls.value.size > 0);
        const pagedItems: Ref<T[]> = ref([]) as Ref<T[]>;
        const lastUrl = ref<string>('');
        const nextUrl = ref<string | null>(null);

        const pendingUrls = ref(new Set<string>());

        const hasItems = computed(() => pagedItems.value.length > 0);
        const isFinished = computed(() => nextUrl.value === null);

        async function get(props: GetProps = { key: '' }): Promise<T | undefined> {
            if (props.disableSSR && !import.meta.client) return; // Force client-side only.
            const url = getUrl(props.path ?? useGetPath, props.key, props.params);

            // If we have it cached, return it immediately.
            if (hasGetResponse(url)) return getResponses.value[url];

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
                // Make sure to always remove the URL from the pending page.
                pendingUrls.value.delete(url);
            }
        }

        /**
         * Call an API method that returns a list that is not paginated.
         */
        async function list(props: ListProps = {}): Promise<T[] | undefined> {
            if (props.disableSSR && !import.meta.client) return; // Force client-side only.
            const url = getUrl(props.path ?? useListPath ?? '', props.key, props.params);
            console.log(url);

            // Check if it's already cached.
            if (hasListResponse(url)) return listResponses.value[url];

            // Don't allow a second reuqest for an item we're already fetching.
            if (pendingUrls.value.has(url)) return undefined;
            pendingUrls.value.add(url);

            try {
                const data = await $fetch<T[]>(url);
                listResponses.value[url] = data as T[];
                return listResponses.value[url];
            } catch (error: any) {
                console.error(`Failed to fetch ${url}`, error.value);
                return undefined;
            } finally {
                pendingUrls.value.delete(url);
            }
        }

        /**
         * Call an API method that returns a PaginatedApiResponse.
         */
        async function page(props: ListProps = {}) {
            if (props.disableSSR && !import.meta.client) return; // Force client-side only.
            if (!useListPath) throw new Error('Cannot use page() with no list URL (useListPath)');

            if (nextUrl.value === null) {
                nextUrl.value = getUrl(useListPath, props.key, props.params);
            }

            // Don't allow a second request for an item we're already fetching.
            if (pendingUrls.value.has(nextUrl.value)) return;
            pendingUrls.value.add(nextUrl.value);

            try {
                const data = await $fetch<PaginatedApiResponse<T>>(nextUrl.value);

                // Success - append data.
                pagedItems.value.push(...data.data as T[]);

                // Update the pointer URL to the next page.
                lastUrl.value = nextUrl.value;
                nextUrl.value = data.next_page_url;
            } catch (error) {
                console.error(`Failed to fetch ${nextUrl.value}`, error);
            } finally {
                // Make sure to always remove the URL from the pending page.
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
            return runtime.public.apiUrl + '/' + myPath + '?' + Object.entries(params).map(([key, value]) => {
                return key + '=' + value;
            }).join('&');
        }

        function hasGetResponse(key: string): boolean {
            return !!getResponses.value[key];
        }

        function hasListResponse(key: string): boolean {
            return !!listResponses.value[key];
        }

        function clear() {
            getResponses.value = {};
            listResponses.value = {};
            pagedItems.value = [];
        }

        return {
            getPath,
            getResponses,
            isFinished,
            isLoading,
            listResponses,
            pagedItems,
            nextUrl,
            // Don't allow the server to hydrate the pending URLs, because this could happen after the server initiated
            // a request, but before it received a response, leading to a "stuck" pendingUrl on the client with no
            // request being made.
            pendingUrls: skipHydrate(pendingUrls),

            hasGetResponse,
            hasListResponse,
            hasItems,

            get,
            list,
            page
        };
    });
}

export const useBookCreditCache = createCacheStore(
    'book-credit',
    'book-credit/{key}',
    'person/{key}/credits'
);
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
export const useCreatureTypeCache = createCacheStore<CreatureTypeApiResponse>(
    'creature-type',
    'creature-type/{key}',
    'creature-types'
);
export const useCreatureMainTypeCache = createCacheStore<CreatureMainTypeApiResponse>(
    'creature-main-type',
    'creature-main-type/{key}',
    'creature-main-types'
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
export const usePersonCache = createCacheStore<PersonApiResponse>(
    'person',
    'person/{key}',
    'people'
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
