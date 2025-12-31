<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourceDetailsList from "~/components/sources/SourceDetailsList.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookContents from "~/components/sources/SourcebookContents.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import BottomNavigation from "~/components/navigation/BottomNavigation.vue";
import SourceCredits from "~/components/sources/SourceCredits.vue";
import MediaImage from "~/components/media/MediaImage.vue";
import {createSource, type SourceApiResponse} from "~/classes/sources/source";
import BaseCard from "~/components/cards/BaseCard.vue";

const route = useRoute();
const store = useSourceCache();

const { pending, data } = useLazyAsyncData(
    'source',
    async () => await store.get({ key: route.params.slug as string }) as Promise<SourceApiResponse|undefined>
);
const item = computed(() => createSource(data.value));

const pageTitle = computed(() => (pending ? 'Loading' : item.value?.name) + ' | ' + SITE_NAME);
useHead({ title: pageTitle });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <!-- Heading -->
            <PageTitle
                :loading="pending"
                :title="item?.name ?? ''"
                back-to="/sources"
                :underline="true"
            >
                <template #labels>
                    <GameEditionBadge v-if="item?.gameEdition" :edition="item?.gameEdition as string"/>
                    <PublicationTypeBadge v-if="item?.publicationType" :type="item?.publicationType as string" />
                </template>
                <template #subtitle>
                    {{ item?.sourceType }}
                </template>
            </PageTitle>
            <!-- /Heading -->
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 items-start lg:grid-cols-3 gap-4 mx-2 my-4 h-full overflow-auto">
            <div id="column-left flex flex-col gap-4">
                <a id="overview"/>
                <MediaImage :loading="pending" :media="item.coverImage" :name="item.name" rounded/>
                <SourceDetailsList :loading="pending" :source="item" class="mt-4"/>
                <ProductLinkButtonContainer
                    v-if="(item?.productIds?.length ?? 0) > 1"
                    :source="item"
                />
            </div>

            <div id="column-mid gap-4">
                <a id="description"/>
                <ProseContainer
                    v-if="item.description"
                    :loading="pending"
                    :markdown="item.description"
                    size="xl"
                />
            </div>

            <div id="column-right" class="flex flex-col w-full gap-4">
                <SourceCredits v-if="item?.editions?.[0]?.credits?.length" :edition="item?.editions?.[0]"/>

                <a id="contents"/>
                <BaseCard v-if="item?.editions?.[0]?.contents?.length">
                    <SourcebookContents :source="item.slug"/>
                </BaseCard>
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

