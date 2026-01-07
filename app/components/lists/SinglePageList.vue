<script setup lang="ts">
import DndListItem from "~/components/lists/DndListItem.vue";

const emit = defineEmits(['selected']);

interface ListItem {
    label?: string
    name?: string
    slug?: string
    to?: string
}

const props = defineProps<{
    class?: string
    filter?: boolean
    items?: ListItem[]
    routeParam: string
}>();

const route = useRoute();
const router = useRouter();
const dndListMoreRef = ref<HTMLElement | null>(null);

const selected = computed(() => route.query?.[props.routeParam] as string | undefined);
const filterText = ref<string>('');

function handleSelect(item: ListItem) {
    router.replace({ query: { ...route.query, s: item.slug } });
    emit('selected', item);
}

// Allow parent elements to access the ref.
defineExpose({ dndListMoreRef });
</script>

<template>
    <UInput
        v-if="filter"
        v-model="filterText"
        variant="ghost"
        placeholder="Filter…"
        class="w-full border-b-2 border-red-800 [&>input]:text-lg mb-2"
    >
        <template v-if="filterText.length > 0" #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="lg"
                icon="i-lucide-x"
                class="cursor-pointer"
                @click="filterText = ''"
            />
        </template>
    </UInput>

    <ul ref="dndListMoreRef" class="overflow-scroll h-full mb-4" :class="props.class">
        <DndListItem
            v-for="item in items?.filter(item =>
                filterText.length === 0 ? true : item.name?.toLowerCase().includes(filterText.toLowerCase())
            ) ?? []"
            :id="item.slug ?? ''"
            :key="item.slug"
            :label="item.name"
            :active="selected === item.slug"
            @click="handleSelect(item)"
        />
    </ul>
</template>
