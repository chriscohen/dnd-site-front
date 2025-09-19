<script setup lang="ts">
import ProductLinkButton from "~/components/buttons/ProductLinkButton.vue";

const props = defineProps({
    loading: { type: Boolean, required: true },
    sourcebook: { type: Object as () => ISourcebook, default: null },
});
</script>

<template>
    <aside v-if="!loading" class="product-link-button-container default-padding">
        <ProductLinkButton
            v-for="productId in props.sourcebook.product_ids"
            :key="productId.id"
            :product-id="productId"
        />
    </aside>
</template>

<style scoped lang="scss">
@use '../../assets/css/mixins';

.product-link-button-container {
    @include mixins.backgroundBlack(0.2);
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 1rem;
}
</style>
