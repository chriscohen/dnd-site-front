<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import MediaLarge from "~/components/media/MediaLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookContents from "~/components/sourcebooks/SourcebookContents.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";

const route = useRoute();
const store = useSourcebookCache();
const path = `http://localhost:8080/api/source/${route.params.slug}?mode=full`;
await store.fetch(path);

const item: ComputedRef<ISourcebook> = computed(() => store.get(path));

useHead({ title: item?.value.name });
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
                    {{ item?.sourcebookTypes?.join(' • ') }}
                </template>
            </PageTitle>
            <!-- /Heading -->
        </template>

        <div class="overflow-y-scroll flex flex-col items-start sm:flex-row gap-4 mx-2 my-4 h-full">
            <!-- Left: Cover Art -->
            <MediaLarge :media="item.coverImage" :name="item.name"/>
            <!-- /Left: Cover Art -->

            <!-- Right Side -->
            <div class="flex flex-col lg:flex-row gap-2 xl:gap-8">
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
                <section class="flex flex-col gap-4">
                    <ProseContainer v-if="item?.description">
                        {{ item.description }}
                    </ProseContainer>

                    <SourcebookContents :contents="item.editions[0]?.contents"/>
                </section>
                <!-- Right of "Under Heading -->
                <!-- /Under Heading -->
            </div>
            <!-- /Right Side -->
        </div>
    </NuxtLayout>
</template>

