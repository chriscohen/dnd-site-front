<script setup lang="ts">
import ProductLinkButton from "~/components/buttons/ProductLinkButton.vue";
import type {Source} from "~/classes/sources/source";

const props = defineProps<{
    sourcebook: Source
}>();
</script>

<template>
    <aside class="product-link-button-container default-padding">
        <ProductLinkButton
            v-for="productId in props.source.productIds"
            :key="productId.id"
            :product-id="productId"
        />
    </aside>
</template>

<style scoped lang="scss">
@use '../../assets/css/default/mixins';

.product-link-button-container {
    @include mixins.backgroundBlack(0.2);
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
}
</style>
