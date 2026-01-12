<script setup lang="ts">
import PageTitle from "~/components/labels/PageTitle.vue";
import {createMagicSchool, type MagicSchoolApiResponse} from "~/classes/magic/magicSchool";
import BaseCard from "~/components/cards/BaseCard.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import MagicSchoolImage from "~/components/magic-schools/MagicSchoolImage.vue";

const route = useRoute();
const store = useMagicSchoolCache();
const data = await store.get({ key: route.params.slug as string }) as MagicSchoolApiResponse;
const item = computed(() => createMagicSchool(data));

const pageTitle = computed(() => item.value?.name ?? 'Loading');

useHead({ title: pageTitle });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="pageTitle" back-to="/magic-schools"/>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            <BaseCard v-if="item.description">
                <aside class="flex flex-row justify-center mt-2 mb-4">
                    <MagicSchoolImage :school="item?.id ?? ''" class="w-24"/>
                </aside>
                <div class="prose" v-html="item.description"/>
            </BaseCard>

            <BaseCard v-if="item?.children">
                <DndHeading size="2" underline class="mb-2">Subschools</DndHeading>

                <ul class="flex flex-col gap-4">
                    <li v-for="child in item.children" :key="child.id">
                        <DndHeading size="3">{{ child.name }}</DndHeading>
                        <div class="prose" v-html="child.description"/>
                    </li>
                </ul>
            </BaseCard>
        </div>
    </NuxtLayout>
</template>
