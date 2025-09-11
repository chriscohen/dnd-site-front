<script setup lang="ts">
const props = defineProps<{
    spell: ISpell
}>();
</script>

<template>
    <img
        class="spellbook-image"
        :src="'https://dnd001.s3.eu-west-2.amazonaws.com/spells/' + props.spell.slug + '.webp'"
        :alt="props.spell.name + ' preview image'"
    >
</template>

<style lang="scss" scoped>
@use '~/assets/css/mixins/mixins';

.spellbook-image {
    position: absolute;
    top: 8rem;
    left: 37rem;
    width: 24rem;
    height: 24rem;
    transform: rotate(3deg);

    @include mixins.heavyShadow;

    border-radius: 1rem;
}
</style>
