<script setup lang="ts">
import {formatPages} from "#imports";

const props = defineProps<{
    reference: IReferenceTeaser
}>();
</script>

<template>
    <a v-if="reference" :href="'/sources/' + reference.slug" class="reference-list-item">
        <img :src="reference.image?.url" :alt="reference.source + ' thumbnail'">
        <span>{{ reference.source }}</span>
        <span class="page-reference">{{ formatPages(reference.page_from, reference?.page_to) }}</span>
    </a>
</template>

<style lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/links';

a.reference-list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: colors.$text-dark;
    font-weight: 700;
    padding-right: 0.5rem;

    > img {
        height: 3rem;
    }
    > span.page-reference {
        font-weight: 300;
        margin-left: auto;
    }
}
</style>
