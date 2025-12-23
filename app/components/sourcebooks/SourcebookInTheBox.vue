<script setup lang="ts">
import type {IBoxedSetItem} from "~/utils";
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    items: IBoxedSetItem[]
}>();
</script>

<template>
    <aside class="in-the-box">
        <DndHeading size="3">In the Box</DndHeading>
        <dl>
            <template v-for="item in items" :key="item.id">
                <dd>{{ item.quantity }}x {{ item.name }}</dd>
                <dt v-if="item.pages">{{ item.pages }}-page {{ item.content_type }}</dt>
                <dt v-else-if="item.quantity > 1">{{ item.content_type }}s</dt>
                <dt v-else>{{ item.content_type }}</dt>
            </template>
        </dl>
    </aside>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';

.in-the-box {
    background: colors.$black-20;
    padding: 0.5rem 1rem;

    > h3 {
        text-align: center;
    }

    dd {
        flex-basis: 70%;
        font-weight: 300;
    }
    dt {
        flex-basis: 30%;
        font-weight: 700;
    }
}
</style>
