<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import {API_URL} from "#imports";
import {createMagicSchool, type MagicSchoolApiResponse} from "~/classes/magic/magicSchool";

const route = useRoute();
const path = API_URL + '/school/' + route.params.slug + '?mode=full';
const store = useMagicSchoolCache();
const data: MagicSchoolApiResponse = store.get(path) as MagicSchoolApiResponse;
const item = createMagicSchool(data);
</script>

<template>
    <div v-if="item" class="page-container">
        <div class="container scrollbar">
            <PageTitle :title="item.name" back-to="/magic-schools" :underline="true"/>
            <div class="prose" v-html="item.description"/>
        </div>
    </div>
</template>
