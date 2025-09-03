<script setup lang="ts">
import {useCampaignSettingStore} from "~/stores/CampaignSettingStore";

const route = useRoute();
const store = useCampaignSettingStore();

const item: ICampaignSetting = await store.getBySlug(route.params.slug as string);
</script>

<template>
    <Suspense>


        <div class="source">
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

        <template #fallback>
            LOADING
        </template>

    </Suspense>
</template>
