import {type IQueryString, ref, useCacheStore} from "#build/imports";

type TypedProps = {
    getPath: string
    listPath: string
};

export function createApiHelper<T>(props: TypedProps) {
    return () => {
        const loading: boolean = ref<boolean>(false);
        const apiResponse = ref<T|T[]|null>(null);
        const cacheStore = useCacheStore();

        function getCached(url: string): T | null {
            const cached = cacheStore.getItem(url);

            if (cached) {
                console.log('[CACHE] hit: ' + url, cached);
                return cached;
            } else {
                console.log('[CACHE] miss: ' + url);
                return null;
            }
        }

        function getUrl(slug?: string | null, qs: IQueryString = {}): string {
            const runtimeConfig = useRuntimeConfig();
            let url = runtimeConfig.public.apiUrl + '/' + (slug ? props.getPath : props.listPath);

            if (slug) {
                url = url + '/' + slug;
            }

            const mapped = Object.entries(qs).map(
                ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
            );

            return url + '?' + mapped.join('&');
        }

        async function get(slug: string, mode: RenderMode, single: boolean): T | null {
            const url = getUrl(slug, { mode: mode });
            const cached = getCached(url);

            if (cached) {
                return new Promise<T | null>((resolve) => resolve(cached));
            }

            const { getData, getStatus, getError } = await useLazyAsyncData(
                'x',
                () => $fetch(url, {
                    method: 'GET',
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })
            );
            watch(getData, (newData: T) => {
                console.log('watch:getData', newData);
                apiResponse.value = newData;
                cacheStore.setItem(url, newData);
            });
            watch(getError, (newError: Error | null) => {
                console.log('watch:getError', newError);
                console.error(newError);
            });
            watch(getStatus, (newStatus) => {
                console.log('watch:getStatus', newStatus);
                loading.value = newStatus === 'pending';
            });
        }

        return {
            apiResponse,
            cacheStore,
            get
        }
    }
}

export const useSourceApiHelper = createApiHelper<ISourcebook>({
    getPath: 'source',
    listPath: 'sources'
});
