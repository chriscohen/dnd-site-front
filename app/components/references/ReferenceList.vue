<script setup lang="ts">
import ReferenceListItem from "~/components/references/ReferenceListItem.vue";

const props = defineProps<{
    references: IReference[]
}>();
</script>

<template>
    <section v-if="references" class="reference-list">
        <ReferenceListItem
            v-for="reference in references"
            :key="reference.id"
            :reference="reference"
        />
    </section>
</template>
