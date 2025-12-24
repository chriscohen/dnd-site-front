<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookContents from "~/components/sourcebooks/SourcebookContents.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import SourcebookCredits from "~/components/sourcebooks/SourcebookCredits.vue";
import type {SourceApiResponse} from "~/classes/sources/source";

const route = useRoute();
const store = useSourcebookCache();
const path = `http://localhost:8080/api/spell/${route.params.slug}?mode=full`;

const item: SourceApiResponse = await store.get(path) as SourceApiResponse;

useHead({ title: item?.name });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
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
                    {{ item?.sourceType }}
                </template>
            </PageTitle>
            <!-- /Heading -->
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 items-start lg:grid-cols-3 gap-4 mx-2 my-4 h-full">
            <div id="column-left">
                <a id="overview"/>
                <Media :media="item.coverImage" :name="item.name"/>
                <SourcebookDetailsList :source="item" class="mt-4"/>
                <ProductLinkButtonContainer
                    v-if="item.productIds?.length > 1"
                    :sourcebook="item"
                />
            </div>

            <div id="column-right" class="flex flex-col gap-4 w-full">
                <!-- Right Side -->
                <a id="description"/>
                <ProseContainer v-if="item.description" :prose="item.description"/>

                <SourcebookCredits v-if="item?.editions?.[0]?.credits?.length" :edition="item?.editions?.[0]"/>

                <a id="contents"/>
                <SourcebookContents
                    v-if="item?.editions?.[0]?.contents?.length"
                    :contents="item.editions[0]?.contents"
                />
                <!-- /Right Side -->
            </div>
            <!-- /Right Side -->
        </div>

        <template #bottomNav>
            <BottomNavigation
                :items="[
                    {
                        anchor: 'overview',
                        icon: 'image',
                        name: 'Overview'
                    },
                    {
                        anchor: 'description',
                        icon: 'notebook-text',
                        name: 'Description',
                        disabled: !item.description
                    },
                    {
                        anchor: 'contents',
                        icon: 'list',
                        name: 'Contents',
                        disabled: !item.editions?.[0]?.contents?.length
                    },
                    {
                        anchor: 'credits',
                        icon: 'users',
                        name: 'Credits',
                        disabled: !item.editions?.[0]?.credits?.length
                    }
                ]"
            />
        </template>
    </NuxtLayout>
</template>

