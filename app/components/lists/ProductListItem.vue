<script setup lang="ts">
import EditionStrip from "~/components/strips/EditionStrip.vue";

const props = defineProps<{
    product: ISourcebook
}>();
</script>

<template>
    <ULink
        :to="'/sources/' + product.slug"
        class="flex flex-row gap-4 items-center hover:bg-gray-800 transition-colors duration-500 ease-in-out p-2"
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
