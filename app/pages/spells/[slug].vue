<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import Spellbook from "~/components/text/Spellbook.vue";

const route = useRoute();
const store = useSpellStore();

const item = await store.getBySlug(route.params.slug as string);
console.log(item);
const title = item !== null ? item.name : 'Loading';

useHead({
    title: title
});
</script>

<template>

    <div class="spell">
        <PageTitle :title="title"/>

        <Spellbook v-if="item !== null" :spell="item"/>
    </div>

</template>
