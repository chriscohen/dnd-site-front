<script setup lang="ts">
import {useCreatureTypeCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import {createCreatureType, type CreatureType, type CreatureTypeApiResponse} from "~/classes/creatures/creatureType";
import {useInfiniteScroll} from "@vueuse/core";
import DndList from "~/components/lists/DndList.vue";
import DndListItem from "~/components/lists/DndListItem.vue";
import {useUiStore} from "~/stores/uiStore";
import BaseCard from "~/components/cards/BaseCard.vue";

const runtime = useRuntimeConfig();
const store = useCreatureTypeCache();
const uiStore = useUiStore();
uiStore.setBackgroundImage('demon.avif');

useHead({ title: 'Creatures' });
definePageMeta({ layout: false });

const selectedItem: Ref<CreatureType | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);
const dndListComponent = ref(null);

await useLazyAsyncData(
    'creature-types',
    async () => await store.page()
);
const items = computed(() => store.pagedItems.map((item: CreatureTypeApiResponse) => createCreatureType(item)) ?? []);

useInfiniteScroll(
    () => dndListComponent.value?.dndListMoreRef,
    () => store.page(),
    {
        distance: runtime.public.infiniteScrollDistance as number,
        interval: runtime.public.infiniteScrollInterval as number
    }
);

onMounted(() => store.page());

async function handleSelect(item: CreatureType) {
    itemSelected.value = true;
    const itemPath = runtime.public.apiUrl + '/creature-types/' + item.slug;
    const response = await store.get({ key: itemPath }) as CreatureTypeApiResponse;
    selectedItem.value = createCreatureType(response);
}
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Creatures" back-to="/"/>
        </template>

        <div class="flex flex-col-reverse sm:flex-row mt-4 gap-4 overflow-hidden h-full">
            <BaseCard>
                <DndList v-if="items" ref="dndListComponent">
                    <DndListItem v-for="item in items" :key="item.id" :item="item">
                        <a :href="`/creature-types/${item.slug}`" class="group-hover:text-black">
                            {{ item.name }}
                        </a>
                    </DndListItem>
                </DndList>
            </BaseCard>
        </div>
    </NuxtLayout>
</template>
