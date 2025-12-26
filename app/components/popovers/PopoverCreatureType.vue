<script setup lang="ts">
import {useCreatureMajorTypeCache} from "~/stores/Store";
import {
    createCreatureMajorType,
    type CreatureMajorType,
    type CreatureMajorTypeApiResponse
} from "~/classes/creatures/creatureMajorType";
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    slug?: string
}>();

const store = useCreatureMajorTypeCache();
const item: Ref<CreatureMajorType | null> = ref<CreatureMajorType | null>(null);

async function onOpen(isOpen: boolean) {
    if (!isOpen || !props.slug) return;

    const data: CreatureMajorTypeApiResponse = await store.get(props.slug) as CreatureMajorTypeApiResponse;
    item.value = createCreatureMajorType(data);
}

</script>

<template>
    <UPopover
        arrow
        mode="hover"
        :content="{ side: 'top' }"
        :ui="{ content: 'bg-yellow-100 text-gray-900 max-w-128' }"
        @update:open="onOpen"
    >
        <span class="cursor-pointer"><slot/></span>

        <template #content>
            <div v-if="store.isLoading">
                <UIcon name="i-lucide-loader-circle" class="animate-spin"/>
            </div>

            <template v-if="item">
                <DndHeading underline size="3" class="mb-2">{{ item.name }}</DndHeading>
                {{ item.description() }}
            </template>
        </template>
    </UPopover>
</template>
