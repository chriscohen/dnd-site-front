<script setup lang="ts">
import {useSourceStore, useSpellStore} from "#imports";

const props = defineProps<{
    editionId: string
    text: string
    sup?: string
    bgClass: string
}>();

const persistedStore = usePersistedStore();

function clicked(e: MouseEvent) {
    persistedStore.toggle(props.editionId);
}

function isActive(id: string): boolean {
    return (persistedStore.get(id)?.active || persistedStore.get('all').active) ?? false;
}
</script>

<template>
    <button
        class="border-stripe"
        :class="[props.bgClass, 'text-default', isActive(editionId) ? 'active' : ''].join(' ')"
        @click="clicked"
    >
        {{props.text}}
        <sup v-if="props.sup !== null">{{props.sup}}</sup>
    </button>
</template>

<style scoped lang="scss">
@use '~/assets/css/borders';
@use '~/assets/css/colors';
@use '~/assets/css/variables';

.edition-button {
    transition: border variables.$default-delay ease-in-out;
}
.edition-all {
    &.active {
        border-color: colors.$border-active;
    }
    &.hover {
        border-color: colors.$border-hover;
    }
}
.edition-1 {
    &.active {
        border-color: colors.$edition-1-active;
    }
    &:hover {
        border-color: colors.$edition-1-hover;
    }
}
.edition-2 {
    &.active {
        border-color: colors.$edition-2-active;
    }
    &:hover {
        border-color: colors.$edition-2-hover;
    }
}
.edition-3 {
    &.active {
        border-color: colors.$edition-3-active;
    }
    &:hover {
        border-color: colors.$edition-3-hover;
    }
}
.edition-4 {
    &.active {
        border-color: colors.$edition-4-active;
    }
    &:hover {
        border-color: colors.$edition-4-hover;
    }
}
.edition-5 {
    &.active {
        border-color: colors.$edition-5-active;
    }
    &:hover {
        border-color: colors.$edition-5-hover;
    }
}
.edition-2024 {
    &.active {
        border-color: colors.$edition-2024-active;
    }
    &:hover {
        border-color: colors.$edition-2024-hover;
    }
}

</style>
