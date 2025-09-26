<script setup lang="ts">
const active = ref<boolean>(false);
</script>

<template>
    <aside id="sidebar" :class="active ? 'active' : ''" :style="active ? { 'min-width': '20rem' } : { 'min-width': '4rem' }">
        <div class="button-group">
            <button @click="active = (active !== true)">
                <Icon
                    :name="active ? 'lucide:chevrons-left' : 'lucide:chevrons-right'"
                    class="icon"/>
            </button>
        </div>
    </aside>
</template>

<style scoped lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/icons';
@use '~/assets/css/mixins';
@use '~/assets/css/variables';

#sidebar {
    background-color: colors.$gray-800;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 0.5rem;
    @include mixins.heavyShadow;
    transition: min-width variables.$default-delay ease-in-out;

    &.active {
        margin-left: 0;
    }

    > .button-group {
        text-align: right;
    }
}
</style>
