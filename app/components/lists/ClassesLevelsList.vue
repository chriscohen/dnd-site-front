<script setup lang="ts">
const props = defineProps<{
    data?: ISpellEditionCharacterClassLevel[]
}>();
</script>

<template>
    <aside v-if="data" class="classes-levels-list">
        <template v-for="item in props.data" :key="item.id">
            <span>{{ item.character_class }}</span>
            <span>{{ item.level }}</span>
        </template>
    </aside>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';

.classes-levels-list {
    display: grid;
    @include fonts.mrs-eaves;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0.5rem 1rem;

    > span {
        display: inline-block;

        &:nth-child(even) {
            text-align: right;
        }
    }
}
</style>
