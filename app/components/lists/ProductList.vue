<script setup lang="ts">
import DndSection from "~/components/containers/DndSection.vue";
import ProductListItem from "~/components/lists/ProductListItem.vue";
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    class?: string
    products: SourcebookApiResponse[]
}>();
</script>

<template>
    <DndSection :class="props.class">
        <DndHeading underline size="2" underline-color="red-800" class="mb-2">Products</DndHeading>
        <div class="h-full overflow-scroll mb-4">
            <ProductListItem v-for="product in products" :key="product.id" :product="product"/>
        </div>
    </DndSection>
</template>
