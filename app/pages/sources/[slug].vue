<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import MediaLarge from "~/components/media/MediaLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookInTheBox from "~/components/sourcebooks/SourcebookInTheBox.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const route = useRoute();
const store = useSourceStore();
const api = useApi(store);
let data;

api.get({
    type: 'source',
    slug: route.params.slug as string,
    mode: RenderMode.FULL,
    multiple: false,
});
</script>

<template>
    <div v-if="!store.latest" class="sourcebook">
        <ConjuringScreen/>
    </div>
    <div v-else class="sourcebook">
        <!-- Left: Cover Art -->
        <MediaLarge :loading="api.loading.value" :name="store.latest?.name" :cover-image="store.latest?.cover_image" />
        <!-- /Left: Cover Art -->

        <!-- Right Side -->
        <div>
            <!-- Heading -->
            <PageTitle
                :title="store.latest?.name ?? ''"
                back-to="/sources"
                :underline="true"
            >
                <template #labels>
                    <GameEditionBadge :edition="store.latest?.game_edition as string"/>
                    <PublicationTypeBadge :type="store.latest?.publication_type as string" />
                </template>
                <template #subtitle>
                    {{ store.latest?.sourcebook_types?.join(' • ') }}
                </template>
            </PageTitle>
            <!-- /Heading -->

            <!-- Under Heading -->
            <div class="sourcebook-content">
                <!-- Left of "Under Heading" -->
                <div class="sourcebook-details">
                    <SourcebookDetailsList
                        :loading="!store.latest"
                        :sourcebook="store.latest as ISourcebook"
                    />
                    <SourcebookInTheBox
                        v-if="store.latest?.editions[0]?.boxed_set_datas?.length > 0"
                        :datas="store.latest?.editions[0]?.boxed_set_datas"
                    />
                    <ProductLinkButtonContainer
                        v-if="store.latest?.product_ids?.length > 1"
                        :loading="!store.latest"
                        :sourcebook="store.latest as ISourcebook"
                    />
                </div>
                <!-- Left of "Under Heading" -->

                <!-- Right of "Under Heading -->
                <ProseContainer v-if="data" :text="store.latest.description"/>
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
