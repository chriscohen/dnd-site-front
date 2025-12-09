import {defineStore} from "pinia";
import {ref, type Ref} from "vue";
import type {Language} from "dnd5e-ts";

export function createCacheStore<T>(storeId: string) {
    return defineStore(storeId, () => {
        const items = ref({}) as Ref<Record<string, T>>;

        function get(key: string): T | undefined {
            return items.value[key];
        }

        function set(key: string, item: T) {
            items.value[key] = item;
        }

        function has(key: string): boolean {
            return !!items.value[key];
        }

        function clear() {
            items.value = {};
        }

        return {
            items,
            get,
            set,
            has,
            clear
        };
    });
}

export const useLanguageCache = createCacheStore<Language>('language');
export const useSourcebookCache = createCacheStore<ISourcebook>('sourcebook');
