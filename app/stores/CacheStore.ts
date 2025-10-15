type CacheEntry = {
    url: string
    result: never | Array<never>
}

export const useCacheStore = defineStore('cache', () => {
    const cache = ref<CacheEntry[]>([]);

    function contains (url: string): boolean {
        return cache.value.find((item: CacheEntry) => item.url == url) != undefined;
    }

    function getItem(url: string): never | Array<never> | undefined {
        const entry = cache.value.find((item: CacheEntry) => item.url == url);
        return entry?.result ?? undefined;
    }

    function setItem(url: string, data: never): void {
        this.$patch((state) => state.cache.push({url: url, result: data} as CacheEntry));
    }

    return {
        cache,
        getItem,
        setItem
    };
});
