<script setup lang="ts">
import EditionStrip from "~/components/strips/EditionStrip.vue";

const props = defineProps<{
    class?: string
    product: SourcebookApiResponse
}>();
</script>

<template>
    <ULink
        :to="'/sources/' + product.slug"
        class="flex flex-row gap-4 items-center hover:bg-highlight hover:text-gray-900 transition-colors duration-200
            ease-in-out p-2"
        :class="props.class"
    >
        <EditionStrip vertical :edition="product.gameEdition"/>
        <NuxtImg
            v-if="product.coverImage"
            :src="product.coverImage.url"
            :alt="product.name + ' cover image'"
            class="h-16"
        />
        <span class="text-lg md:text-2xl">{{ product.name }}</span>
    </ULink>
</template>
