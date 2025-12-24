<script setup lang="ts">
import PopoverContentBase from "~/components/popovers/PopoverContentBase.vue";
import type {MagicSchool} from "~/classes/magic/magicSchool";

const props = defineProps<{
    link?: boolean
    school?: MagicSchool
}>();
</script>

<template>
    <span v-if="school" class="magic-school-label">
        <template v-if="school.parent">
            <UPopover mode="hover" :open-delay="500">
                <NuxtLink
                    v-if="props.link"
                    :to="'/magic-schools/' + school.parent?.name?.toLowerCase()"
                    class="link text-dimmed"
                >
                    {{ school.parent.name }}
                </NuxtLink>
                <template v-else>{{ school.parent.name }}</template>

                <template #content>
                    <PopoverContentBase>{{ school.parent.description }}</PopoverContentBase>
                </template>
            </UPopover>

            (<UPopover mode="hover" :open-delay="500">
                <NuxtLink v-if="props.link" :to="'/magic-schools/' + school.name?.toLowerCase()" class="link text-dimmed">
                    {{ school.name }}
                </NuxtLink>
            <template v-else>{{ school.name }}</template>

            <template #content>
                <PopoverContentBase>{{ school.parent.description }}</PopoverContentBase>
            </template>
            </UPopover>)
        </template>

        <template v-else>
            <UPopover mode="hover" :open-delay="500">
                <NuxtLink
                    v-if="props.link"
                    :to="'/magic-schools/' + school?.name?.toLowerCase()"
                    class="link text-dimmed"
                >
                    {{ school.name }}
                </NuxtLink>
                <template v-else>{{ school.name }}</template>

                <template #content>
                    <PopoverContentBase>{{ school.description }}</PopoverContentBase>
                </template>
            </UPopover>
        </template>
    </span>
</template>
