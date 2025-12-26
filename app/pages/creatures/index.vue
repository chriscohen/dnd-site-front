<script setup lang="ts">
import {useCreatureCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import CreatureList from "~/components/lists/creatures/CreatureList.vue";
import {createCreature, type Creature, type CreatureApiResponse} from "~/classes/creatures/creature";

const store = useCreatureCache();
const data: CreatureApiResponse[] = await store.list() as CreatureApiResponse[];
const items = data?.map((item: CreatureApiResponse) => createCreature(item));

useHead({ title: 'Species' });
definePageMeta({ layout: false });

const selectedItem: Ref<Creature | undefined> = ref(undefined);
const itemSelected: Ref<boolean> = ref(false);

async function handleSelect(item: Creature) {
    itemSelected.value = true;
    const itemPath = API_URL + '/creature/' + item.slug + '?mode=full';
    selectedItem.value = await store.get(itemPath) as Creature;
}
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Species" back-to="/"/>
        </template>

        <div class="flex flex-col-reverse sm:flex-row mt-4 gap-4 overflow-hidden h-full">
            <CreatureList :items="items"/>
        </div>
    </NuxtLayout>
</template>
