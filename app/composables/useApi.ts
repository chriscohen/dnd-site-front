import type {Store} from "pinia";
import {useCacheStore} from "~/stores/CacheStore";

type ApiGetProps = {
    type: string,
    slug?: string,
    mode?: RenderMode,
    multiple?: boolean
}

export const useApi = (store: Store) => {
    const persistedStore = usePersistedStore();
    const runtimeConfig = useRuntimeConfig();
    const indicator = useLoadingIndicator();
    const apiUrl = runtimeConfig.public.apiUrl;
    const loading = ref<boolean>(false);
    const item = ref<T | null>(null);
    const cacheStore = useCacheStore();

    function get(props: ApiGetProps) {
        const url = getUrl(props.type, props.slug, props.mode);
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
                loading.value = true;
                indicator.start();
            } else {
                indicator.finish();
                loading.value = false;
            }
        });
        watch(data, (newValue) => {
            if (props.multiple) {
                store.replace(newValue, props.mode);
            } else {
                item.value = newValue;
                store.add(newValue, props.mode);
            }
        });
    }

    function getCached(url: string): T | null {

    }

    function getUrl(url: string, slug?: string, mode?: RenderMode) {
        const myMode = mode ?? RenderMode.SHORT;
        const middle = slug ? url + '/' + slug : url;

        return apiUrl + '/' + middle + '?mode=' + myMode + '&editions=' + persistedStore.getEditionsQueryString;
    }

    return {
        get,
        getUrl,
        item,
        loading
    }
}
