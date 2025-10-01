type CacheEntry = {
    query: string
    result: T|T[]
}

export const useCacheStore = defineStore('cache', () => {
    const cache = ref<CacheEntry[]>([]);

    const contains = computed(() => {
        return (url: string) => cache.value.find((item: CacheEntry) => item.url == url) !== null;
    });

    const getItem = computed(() => {
        return (url: string) => cache.value.find((item: CacheEntry) => item.url == url);
    });

    function setItem(url: string, data) {
        cache.value.push = {query: url, result: data};
    }

    return {
        cache,
        getItem,
        setItem
    };
});
