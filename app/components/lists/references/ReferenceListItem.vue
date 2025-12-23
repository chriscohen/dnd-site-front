<script setup lang="ts">
import {formatPages} from "#imports";

const props = defineProps<{
    reference: ReferenceApiResponse
}>();
</script>

<template>
    <NuxtLink v-if="reference" :href="'/sources/' + reference.slug" class="reference-list-item item-link">
        <img :src="reference.image?.url" :alt="reference.source + ' thumbnail'">
        <span>{{ reference.source }}</span>
        <span class="page-reference">{{ formatPages(reference.pageFrom, reference?.pageTo) }}</span>
    </NuxtLink>
</template>

<style lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/variables';

.reference-list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 700;
    padding: 0.25rem 1rem 0.25rem 0.5rem;

    > img {
        height: 3rem;
    }
    > span.page-reference {
        font-weight: 300;
        margin-left: auto;
    }
}

a.reference-list-item {
    background-color: transparent;
    color: colors.$text;
    transition: all variables.$default-delay ease-in-out;

    &:hover {
        background-color: colors.$bg-hover;
        color: colors.$text-dark;
    }
}

</style>
