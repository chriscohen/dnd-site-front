<script setup lang="ts">
import DndSection from "~/components/containers/DndSection.vue";
import ProductListItem from "~/components/lists/ProductListItem.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import {createSource, type Source} from "~/classes/sources/source";

const props = defineProps<{
    class?: string
    products?: Source[],
    publisher?: string
}>();

const store = useSourceCache();

const items = computed<Source[]>(() => store.listItems.map(createSource));

if (props.publisher) {
    console.log('publisher detected');
    store.loadMore({ params: { publisher: props.publisher } });
}
</script>

<template>
    <DndSection v-if="products || publisher" :class="props.class" class="self-start flex flex-col">
        <DndHeading underline size="2" underline-color="red-800" class="mb-2">Products</DndHeading>
        <div v-if="products" class="overflow-y-scroll flex-1 min-h-0 mb-4">
            <ProductListItem v-for="product in products" :key="product.id" :product="product"/>
        </div>

        <div v-if="publisher">
            <ProductListItem v-for="item in items" :key="item.id" :product="item"/>
        </div>

        <template v-if="store.isLoading">
            <USkeleton class="w-full h-12"/>
        </template>
    </DndSection>
</template>
