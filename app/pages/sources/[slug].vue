<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import MediaLarge from "~/components/media/MediaLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useFetch} from "#app";

const route = useRoute();
const store = useSourcebookCache();
const path = `http://localhost:8080/api/source/${route.params.slug}?mode=full`;
await store.fetch(path);

const item: ComputedRef<ISourcebook> = computed(() => store.get(path));
</script>

<template>
    <div v-if="item as ISourcebook" class="page-content sourcebook">
        <!-- Heading -->
        <PageTitle
            :title="item?.name ?? ''"
            back-to="/sources"
            :underline="true"
        >
            <template #labels>
                <GameEditionBadge :edition="item?.gameEdition as string"/>
                <PublicationTypeBadge :type="item?.publicationType as string" />
            </template>
            <template #subtitle>
                {{ item?.sourcebookTypes?.join(' • ') }}
            </template>
        </PageTitle>
        <!-- /Heading -->


        <div class="overflow-y-scroll flex flex-col items-start sm:flex-row gap-4 mx-2 my-4 h-full">
            <!-- Left: Cover Art -->
            <MediaLarge :media="item.coverImage" :name="item.name"/>
            <!-- /Left: Cover Art -->

            <!-- Right Side -->
            <div class="flex flex-col xl:flex-row gap-2 xl:gap-8">
                <!-- Under Heading -->
                <!-- Left of "Under Heading" -->
                <div class="sourcebook-details">
                    <SourcebookDetailsList
                        :sourcebook="item"
                    />
                    <ProductLinkButtonContainer
                        v-if="item.productIds?.length > 1"
                        :sourcebook="item"
                    />
                </div>
                <!-- Left of "Under Heading" -->

                <!-- Right of "Under Heading -->
                <div class="prose bg-black/50 p-4" v-html="item.description"/>
                <!-- Right of "Under Heading -->
                <!-- /Under Heading -->
            </div>
            <!-- /Right Side -->
        </div>
    </div>
</template>

