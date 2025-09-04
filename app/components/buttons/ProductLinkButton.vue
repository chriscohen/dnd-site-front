<script setup lang="ts">
import {useCompanyStore} from "~/stores/CompanyStore";

const props = defineProps({
    productId: { type: Object as () => IProductId, required: true },
});

const companyStore = useCompanyStore();
const company = await companyStore.getBySlug(props.productId.origin.slug);
</script>

<template>
    <Suspense>
        <ULink :to="props.productId.url">
            <NuxtImg
                :src="company?.logo?.url"
                :alt="company?.name + ' logo'"
                class="website-logo"
            />
        </ULink>

        <template #fallback>
            LOADING
        </template>
    </Suspense>
</template>

<style scoped lang="scss">
.website-logo {
    filter: brightness(75%);
    max-height: 2rem;
    transition: 250ms ease-in-out;

    &:hover {
        filter: brightness(100%);
    }
}
</style>
