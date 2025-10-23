type CacheEntry = {
    url: string
    result: never | Array<never>
}

export const useCacheStore = defineStore('cache', () => {
    const cache = ref<CacheEntry[]>([]);
    console.log('new cache store');

    function contains (url: string): boolean {
        return cache.value.find((item: CacheEntry) => item.url == url) != undefined;
    }

    function getItem(url: string): never | Array<never> | undefined {
        const entry = cache.value.find((item: CacheEntry) => item.url == url);
        return entry?.result ?? undefined;
    }

    function setItem(url: string, data: never): void {
        const index = cache.value.findIndex((item: CacheEntry) => item.url == url);
        console.log('index', index);

        if (index < 0) {
            this.$patch((state) => state.cache.push({url: url, result: data} as CacheEntry));
        } else {
            cache.value.splice(index, 1, {url: url, result: data});
        }
    }

    return {
        cache,
        getItem,
        setItem
    };
});
