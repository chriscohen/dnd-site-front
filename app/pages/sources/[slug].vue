<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import CoverArtLarge from "~/components/media/CoverArtLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";

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
                    <PageTitle :title="item.name" back-to="/sources">
                        <GameEditionBadge :edition="item?.game_edition as string"/>
                        <PublicationTypeBadge :type="item?.publication_type as string" />
                    </PageTitle>
                    <!-- /Heading -->

                    <!-- Under Heading -->
                    <div class="grid grid-cols-3 gap-16 items-start">
                        <!-- Left of "Under Heading" -->
                        <div class="flex flex-col gap-2">
                            <SourcebookDetailsList :sourcebook="item as ISourcebook"/>
                            <ProductLinkButtonContainer
                                v-show="(item as ISourcebook).product_ids.length > 1"
                                :sourcebook="item as ISourcebook"
                            />
                        </div>
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
