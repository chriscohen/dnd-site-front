<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import CoverArtLarge from "~/components/media/CoverArtLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookInTheBox from "~/components/sourcebooks/SourcebookInTheBox.vue";

const route = useRoute();
const store = useSourceStore();

const item = await store.getBySlug(route.params.slug as string, RenderMode.FULL);
</script>

<template>
    <div class="sourcebook">
        <!-- Left: Cover Art -->
        <CoverArtLarge :loading="!item" :name="item?.name" :cover-image="item?.cover_image" />
        <!-- /Left: Cover Art -->

        <!-- Right Side -->
        <div>
            <!-- Heading -->
            <PageTitle
                :loading="!item"
                :title="item?.name ?? ''"
                back-to="/sources"
                :subtitle="item?.sourcebook_types?.join(' • ')"
            >
                <GameEditionBadge :edition="item?.game_edition as string"/>
                <PublicationTypeBadge :type="item?.publication_type as string" />
            </PageTitle>
            <!-- /Heading -->

            <!-- Under Heading -->
            <div class="sourcebook-content">
                <!-- Left of "Under Heading" -->
                <div class="sourcebook-details">
                    <SourcebookDetailsList
                        :loading="!item"
                        :sourcebook="item as ISourcebook"
                    />
                    <SourcebookInTheBox
                        v-if="item?.editions[0]?.boxed_set_items?.length > 0"
                        :items="item?.editions[0]?.boxed_set_items"
                    />
                    <ProductLinkButtonContainer
                        v-if="item?.product_ids?.length > 1"
                        :loading="!item"
                        :sourcebook="item as ISourcebook"
                    />
                </div>
                <!-- Left of "Under Heading" -->

                <!-- Right of "Under Heading -->
                <ProseContainer v-if="item" :text="item.description"/>
                <!-- Right of "Under Heading -->
            </div>
            <!-- /Under Heading -->
        </div>
        <!-- /Right Side -->
    </div>
</template>

<style scoped lang="scss">
.sourcebook {
    display: flex;
    gap: 4rem;

    .prose {
        column-span: 2;
    }
}

.sourcebook-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sourcebook-content {
    display: grid;
    column-count: 3;
    gap: 4rem;
}

.prose {
    grid-column: 2 / span 2;
}
</style>
