<script setup lang="ts">
import PopoverContentBase from "~/components/popovers/PopoverContentBase.vue";

const props = defineProps<{
    classes?: string
    size: string,
    school?: IMagicSchool
}>();

</script>

<template>
    <div v-if="!school" class="skeleton magic-school-label" :style="{ width: size, height: size }"/>

    <UPopover v-if="school" mode="hover">
        <img
            class="magic-school-label"
            :class="classes"
            :src="school.parent ? school.parent.image.url : school.image.url"
            :alt="school?.name + ' magic school'"
            :style="{ width: size, height: size }"
        >

        <template #content>
            <PopoverContentBase>
                <h3>{{ school?.name }}</h3>
                <p>{{ school?.description }}</p>
            </PopoverContentBase>
        </template>
    </UPopover>
</template>

<style lang="scss" scoped>
@use '~/assets/css/colors';

div[data='reka-popper-content-wrapper'] {
    border-radius: 2rem;

    > div {
        background: none !important;
        display: none;
    }
}
</style>
