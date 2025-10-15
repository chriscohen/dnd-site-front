<script setup lang="ts">
const props = defineProps<{
    data?: ISpellEditionCharacterClassLevel[]
}>();
</script>

<template>
    <aside v-if="data" class="classes-levels-list">
        <template v-for="item in props.data" :key="item.id">
            <span>
                <NuxtLink :to="'/' + (item.type == 'feat' ? 'feats/' : 'classes/') + item.slug" class="link">
                    {{ item.name }}
                </NuxtLink>
            </span>
            <span>{{ item.level }}</span>
        </template>
    </aside>
</template>

<style scoped lang="scss">
@use '~/assets/css/colors';
@use '~/assets/css/fonts';

.classes-levels-list {
    background: colors.$black-80;
    border-radius: 0.5rem;
    display: grid;
    font-size: 125%;
    @include fonts.mrs-eaves;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0.5rem 1rem;

    > span {
        color: colors.$text;
        display: inline-block;

        &:nth-child(even) {
            text-align: right;
            font-weight: bold;
        }
    }
}
</style>
