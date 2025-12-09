<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import {useMagicSchoolStore} from "~/stores/MagicSchoolStore";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const route = useRoute();
const api = useApi({
    cache: useMagicSchoolStore(),
    type: 'school',
    slug: route.params.slug as string,
    mode: RenderMode.FULL,
    multiple: false,
})

api.get();
</script>

<template>
    <div v-if="!api.getItem()">
        <ConjuringScreen/>
    </div>

    <div v-else class="page-container">
        <div class="container scrollbar">
            <PageTitle :title="api.getItem()?.name" back-to="/magic-schools" :underline="true"/>
            <div class="prose" v-html="api.getItem()?.description"/>
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
