<script setup lang="ts">
import ReferenceListItem from "~/components/references/ReferenceListItem.vue";

const props = defineProps<{
    references: IReference[],
    showTitle: boolean
}>();
</script>

<template>
    <section v-if="references" class="reference-list">
        <h3 v-if="showTitle">References</h3>
        <ReferenceListItem
            v-for="reference in references"
            :key="reference.id"
            :reference="reference"
        />
    </section>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';

.reference-list {
    margin-top: 0.5rem;

    > h3 {
        @include fonts.mrs-eaves;
        text-align: center;
    }
}
</style>
