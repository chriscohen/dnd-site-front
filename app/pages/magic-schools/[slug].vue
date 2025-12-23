<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import {API_URL} from "#imports";
import {computed} from "vue";

const route = useRoute();
const path = API_URL + '/school/' + route.params.slug + '?mode=full';
const store = useMagicSchoolCache();
await store.fetch(path);
const item: ComputedRef<MagicSchoolApiResponse> = computed(() => store.get(path));
</script>

<template>
    <div v-if="item" class="page-container">
        <div class="container scrollbar">
            <PageTitle :title="item.name" back-to="/magic-schools" :underline="true"/>
            <div class="prose" v-html="item.description"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/default/layout';

.prose {
    margin-top: 1rem;
    margin-bottom: 2rem;
}
</style>
