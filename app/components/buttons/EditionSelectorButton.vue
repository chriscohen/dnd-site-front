<script setup lang="ts">
const props = defineProps({
    editionId: { type: String, required: true },
    text: { type: String, required: true },
    sup: { type: String, default: null },
    bgClass: { type: String, required: true },
});

const selectedEditionsStore = useSelectedEditionStore();
</script>

<template>
    <button
        :class="[props.bgClass, 'text-default', selectedEditionsStore.get(props.editionId)?.active ? 'active' : ''].join(' ')"
        @click="selectedEditionsStore.toggle(props.editionId)"
    >
        {{props.text}}
        <sup v-if="props.sup !== null">{{props.sup}}</sup>
    </button>
</template>

<style scoped lang="scss">
@use '~/assets/css/variables/colors';
@use '~/assets/css/variables/variables';

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
