<script setup lang="ts">
import {useMagicSchoolCache} from "~/stores/Store";
import {createMagicSchool, type MagicSchoolApiResponse} from "~/classes/magic/magicSchool";

const path = API_URL + '/schools?mode=full';
const store = useMagicSchoolCache();
await store.get(path);
const data: MagicSchoolApiResponse = store.get(path) as MagicSchoolApiResponse;
const item = createMagicSchool(data);
</script>

<template>
    <span>not implemented</span>
</template>
