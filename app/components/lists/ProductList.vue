<script setup lang="ts">
import DndSection from "~/components/containers/DndSection.vue";
import ProductListItem from "~/components/lists/ProductListItem.vue";
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    products: ISourcebook[]
}>();
</script>

<template>
    <DndSection>
        <DndHeading size="2" border-color="red-800">Products</DndHeading>
        <ProductListItem v-for="product in products" :key="product.id" :product="product"/>
    </DndSection>
</template>
