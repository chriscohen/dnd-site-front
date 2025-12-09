<script setup lang="ts">
import {type ActorType, type ActorTypeJsonItem, createActorType} from "dnd5e-ts";
import StatBlock from "~/components/dnd/StatBlock.vue";
import {useFetch} from "#app";

const route = useRoute();
const path = `/data/creatures/${route.params.slug as string}.json`;
console.log('path:', path);
const { data: rawJson } = await useFetch(path, { server: false });

const creature = computed(() => {
    if (!rawJson.value) return null;
    console.log('rawJson:', rawJson.value);
    return createActorType().fromJson(rawJson.value);
})
</script>

<template>
    <Suspense>
       <StatBlock v-if="creature" :creature="creature"/>

    </Suspense>
</template>
