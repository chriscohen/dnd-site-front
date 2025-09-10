<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true },
    backTo: { type: String, default: '' }
});
</script>

<template>
    <div class="page-title">
        <NuxtLink v-if="props.backTo.length" :to="props.backTo">
            <Icon name="lucide:chevron-left" class="text-gray-500 hover:text-gray-200 hover:animate-bounce-left" size="3rem" />
        </NuxtLink>
        <h1>{{ props.title }}</h1>
        <slot/>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/variables/colors';

.page-title {
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid colors.$gray-400;
    margin-bottom: 1rem;

    > h1 {
        flex-grow: 1;
    }
}
</style>
