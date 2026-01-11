<script setup lang="ts">
import {useMagicSchoolCache} from "~/stores/Store";
import {createMagicSchool} from "~/classes/magic/magicSchool";
import TeaserGrid from "~/components/teasers/TeaserGrid.vue";
import MagicSchoolTeaser from "~/components/magic-schools/MagicSchoolTeaser.vue";
import PageTitle from "~/components/labels/PageTitle.vue";

const store = useMagicSchoolCache();

const { data } = useLazyAsyncData(
    'magic-schools',
    async () => await store.page()
);
const items = data.value?.map(createMagicSchool);

useHead({ title: 'Magic Schools' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Magic Schools" back-to="/" :underline="true"/>
        </template>

        <div class="h-full overflow-y-scroll">
            <ClientOnly>
                <section
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full gap-16
                    overflow-scroll"
                >
                    <MagicSchoolTeaser v-for="item in items" :key="item.id" :item="item"/>
                </section>
            </ClientOnly>
        </div>
    </NuxtLayout>
</template>
