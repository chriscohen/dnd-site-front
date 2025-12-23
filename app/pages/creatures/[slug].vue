<script setup lang="ts">
import {ArmorClassSource} from "#imports";
import PageTitle from "~/components/labels/PageTitle.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import StatBlock from "~/components/dnd/StatBlock.vue";
import {createCreature, type CreatureApiResponse} from "~/classes/creatures/creature";

// const route = useRoute();
// const store = useSpeciesCache();
// const path = API_URL + '/creature/' + route.params.slug + '?mode=full';
// await store.fetch(path);
//
// const item: ComputedRef<ISpecies> = computed(() => store.get(path));

const data: CreatureApiResponse = {
    id: '123',
    name: 'Bugbear',
    slug: 'bugbear',
    editions: [
        {
            id: '123',
            gameEdition: '5e',
            abilityScoreModifiers: {

            },
            abilities: {
                str: 15,
                dex: 14,
                con: 13,
                int: 8,
                wis: 11,
                cha: 9
            },
            armorClass: {
                id: '123',
                items: [
                    {
                        id: '123',
                        sourceType: ArmorClassSource.EQUIPMENT,
                        source: 'hide armor',
                        value: 2
                    },
                    {
                        id: '456',
                        sourceType: ArmorClassSource.EQUIPMENT,
                        source: 'shield',
                        value: 2
                    }
                ]
            },
            challengeRating: 1,
            hitPoints: {
                id: '123',
                average: 27,
                formula: '5d8+5'
            },
            languages: [
                {
                    id: '123',
                    slug: 'common',
                    name: 'Common'
                },
                {
                    id: '345',
                    slug: 'goblin',
                    name: 'Goblin'
                }
            ],
            movementSpeeds: {
                walk: 30
            },
            senses: [
                {
                    id: '123',
                    range: 60,
                    type: SenseType.DARKVISION,
                    unit: DistanceUnit.FOOT
                }
            ],
            sizes: [CreatureSizeUnit.MEDIUM],
            type: {
                id: '123',
                name: 'Humanoid',
                slug: 'humanoid',
                editions: [
                    {
                        id: '123',
                        gameEdition: '5e'
                    }
                ],

            }
        }
    ]
}
const item = createCreature(data);

useHead({ title: 'Loading' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Bugbear" back-to="/species">
                <template #subtitle>CreatureApiResponse</template>
            </PageTitle>
        </template>

        <div class="flex flex-col">
            <DndHeading size="2" loading>Title</DndHeading>
            <StatBlock :creature="item" :edition="item?.editions?.[0]"/>
            <NuxtImg :src="CDN_URL + '/creatures/bugbear-portrait.webp'" alt="Bugbear"/>
        </div>

        <template #bottomNav>
            <BottomNavigation :items="[]"/>
        </template>
    </NuxtLayout>
</template>
