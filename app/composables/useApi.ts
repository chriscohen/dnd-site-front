type ApiGetProps = {
    type: string,
    slug?: string,
    mode?: RenderMode,
    multiple?: boolean
}

export const useApi = (props: ApiGetProps) => {
    const type = props.type;
    const slug = props.slug;
    const mode = props.mode;
    const multiple = props.multiple;
    const persistedStore = usePersistedStore();
    const runtimeConfig = useRuntimeConfig();
    const indicator = useLoadingIndicator();
    const apiUrl = runtimeConfig.public.apiUrl;
    const loading = ref<boolean>(false);
    const item = ref<T | null>(null);
    const cacheStore = useCacheStore();

    function get() {
        const url = getUrl(type, slug, mode);
        const cached = cacheStore.getItem(url);

        if (cached) {
            console.log('[CACHE] hit: ' + url, cached);
            return cached;
        } else {
            console.log('[CACHE] miss: ' + url);
        }

        const { data, error, status } = useLazyAsyncData(props.type,
            () => $fetch(url, {
                method: 'GET',
                headers: {"Access-Control-Allow-Origin": "*"}
            }),
            {watch: [persistedStore]}
        );
        watch(status, (newValue) => {
            if (newValue == 'pending') {
                console.log('status is now pending');
                loading.value = true;
                indicator.start();
            } else {
                console.log('status is NOT pending');
                indicator.finish();
                loading.value = false;
            }
        });
        watch(data, (newValue) => {
            cacheStore.setItem(url, newValue);
        });
    }

    function getItem(): T | T[] | null {
        return cacheStore.getItem(getUrl(type, slug, mode));
    }

    function getUrl(url: string, slug?: string, mode?: RenderMode) {
        const myMode = mode ?? RenderMode.SHORT;
        const middle = slug ? url + '/' + slug : url;

        return apiUrl + '/' + middle + '?mode=' + myMode + '&editions=' + persistedStore.getEditionsQueryString;
    }

    return {
        get,
        getItem,
        getUrl,
        item,
        loading
    }
}
