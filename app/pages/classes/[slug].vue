<script setup lang="ts">
import {useRoute} from "#app";
import {useCharacterClassCache} from "~/stores/Store";

const route = useRoute();
const path = API_URL + '/class/' + route.params.slug + '?mode=full';
const store = useCharacterClassCache();
await store.get(path);
const item: ComputedRef<ICharacterClass> = computed(() => store.get(path));
</script>

<template>
    <div v-if="item">

    </div>
</template>
