<script setup lang="ts">
const props = defineProps<{

}>();
</script>

<template>
    <div class="popover">
        <slot/>
    </div>
</template>

<style lang="scss">
@forward '~/assets/css/components/popover';
</style>
