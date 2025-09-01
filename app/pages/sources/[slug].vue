<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import CoverArtLarge from "~/components/media/CoverArtLarge.vue";

const route = useRoute();
const store = useSourcebookStore();

const item = await store.getBySlug(route.params.slug as string);
</script>

<template>
    <Suspense fallback="loading">
        <div class="source">
            <div class="flex items-start gap-16">
                <!-- Left: Cover Art -->
                <CoverArtLarge :name="item.name ?? ''" :cover-image="item.cover_image" />
                <!-- /Left: Cover Art -->

                <!-- Right Side -->
                <div>
                    <!-- Heading -->
                    <div class="flex items-end border-b-1 border-gray-400 mb-4">
                        <NuxtLink to="/sources">
                            <Icon name="lucide:chevron-left" class="text-gray-500 hover:text-gray-200 hover:animate-bounce-left" size="3rem" />
                        </NuxtLink>
                        <h1 class="font-[Modesto_Condensed] text-6xl mr-8">{{ item?.name}}</h1>
                        <GameEditionBadge :edition="item?.game_edition as string"/>
                        <PublicationTypeBadge :type="item?.publication_type as string" />
                    </div>
                    <!-- /Heading -->

                    <!-- Under Heading -->
                    <div class="grid grid-cols-3 gap-16 items-start">
                        <!-- Left of "Under Heading" -->
                        <SourcebookDetailsList :sourcebook="item as ISourcebook"/>
                        <!-- Left of "Under Heading" -->

                        <!-- Right of "Under Heading -->
                        <ProseContainer v-if="item" class="col-span-2" :text="item.description"/>
                        <!-- Right of "Under Heading -->
                    </div>
                    <!-- /Under Heading -->
                </div>
                <!-- /Right Side -->
            </div>
        </div>

        <template #loading>
            LOADING
        </template>
    </Suspense>
</template>
