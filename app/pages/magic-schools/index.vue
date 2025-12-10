<script setup lang="ts">
import {useMagicSchoolCache} from "~/stores/Store";
import {computed, type ComputedRef} from "vue";
import type { IMagicSchool } from "#imports";

const path = API_URL + '/schools?mode=full';
const store = useMagicSchoolCache();
await store.get(path);
const item: ComputedRef<IMagicSchool> = computed(() => store.get(path));
</script>

<template>
    not implemented
</template>
