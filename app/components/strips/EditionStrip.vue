<script setup lang="ts">
import {formatEditionShort} from "~/utils/utils";

const props = defineProps<{
    edition: string
    vertical?: boolean
}>();

const className: string = 'bg-' + editionToClass(props.edition);
const classNameActive: string = className + '-active';
</script>

<template>
    <aside v-if="!vertical" class="edition-strip block mt-auto h-2" :class="classNameActive"/>
    <aside v-else class="relative edition-strip block h-16">
        <div class="absolute top-0 left-1/2 w-2 h-full" :class="classNameActive"/>
    </aside>
</template>

<style lang="scss">
@use '~/assets/css/default/backgrounds';

.sideways {
    writing-mode: vertical-lr;
    transform: scale(-1, -1);
}
</style>
