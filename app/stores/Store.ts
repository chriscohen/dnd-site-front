import {defineStore} from "pinia";
import {ref, type Ref} from "vue";
import type {Language} from "dnd5e-ts";

export function createCacheStore<T>(storeId: string) {
    return defineStore(storeId, () => {
        const items = ref({}) as Ref<Record<string, T | T[]>>;

        function get(key: string): T | T[] | undefined {
            return items.value[key];
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
            if (items.value[url]) return;

            try {
                const data = await $fetch<T | T[]>(url);
                set(url, data);
            } catch (error: any) {
                console.error(`Failed to fetch ${url}`, error);
            }
        }

        return {
            items,
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
export const useLanguageCache = createCacheStore<Language>('language');
export const useMagicSchoolCache = createCacheStore('magic-school');
export const useSourcebookCache = createCacheStore<ISourcebook>('sourcebook');
export const useSpeciesCache = createCacheStore<ISpecies>('species');
export const useSpellCache = createCacheStore<ISpell>('spell');
