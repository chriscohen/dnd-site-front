<script setup lang="ts">
import {useMagicSchoolCache} from "~/stores/Store";
import {computed, type ComputedRef} from "vue";
import type { MagicSchoolApiResponse } from "#imports";

const path = API_URL + '/schools?mode=full';
const store = useMagicSchoolCache();
await store.get(path);
const item: ComputedRef<MagicSchoolApiResponse> = computed(() => store.get(path));
</script>

<template>
    not implemented
</template>
