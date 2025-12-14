<script setup lang="ts">

import {useCampaignSettingCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";

const route = useRoute();
const path = API_URL + '/campaign-setting/' + route.params.slug + '?mode=full';
const store = useCampaignSettingCache();
await store.fetch(path);

const item: ComputedRef<ICampaignSetting> = computed(() => store.get(path));

useHead({ title: item?.value.name + ' Campaign Setting' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle :title="item?.name" subtitle="Campaign Setting"/>
        </template>

        <div v-if="item">
            <div class="flex items-start gap-16">
                <!-- Left: Cover Art -->
                <div class="d-effect max-w-[30%]"/>
                <!-- /Left: Cover Art -->

                <!-- Right Side -->
                <div>
                    <!-- Heading -->
                    <div class="flex items-end border-b-1 border-gray-400 mb-4">
                        <NuxtLink to="/items">
                            <Icon name="lucide:chevron-left" class="text-gray-500 hover:text-gray-200 hover:animate-bounce-left" size="3rem" />
                        </NuxtLink>
                        <h1 class="font-[Modesto_Condensed] text-6xl mr-8">{{ item.name }}</h1>
                    </div>
                    <!-- /Heading -->

                    <!-- Under Heading -->
                    <div class="grid grid-cols-3 gap-16">
                        <!-- Left of "Under Heading" -->
                        details
                        <!-- Left of "Under Heading" -->

                        <!-- Right of "Under Heading -->
                        <div class="col-span-2 markdown">temp</div>
                        <!-- Right of "Under Heading -->
                    </div>
                    <!-- /Under Heading -->
                </div>
                <!-- /Right Side -->
            </div>
        </div>

    </NuxtLayout>
</template>
