<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import MediaLarge from "~/components/media/MediaLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import SourcebookInTheBox from "~/components/sourcebooks/SourcebookInTheBox.vue";
import {useRuntimeConfig} from "#app";

const route = useRoute();
const store = useSourceStore();
const runtimeConfig = useRuntimeConfig();

const { data, error, status } = await useAsyncData('source', () => $fetch(
    runtimeConfig.public.apiUrl + '/source/' + route.params.slug + '?mode=full',
    {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
));
</script>

<template>

    <div class="sourcebook">
        <!-- Left: Cover Art -->
        <MediaLarge :loading="status === 'pending'" :name="data?.name" :cover-image="data?.cover_image" />
        <!-- /Left: Cover Art -->

        <!-- Right Side -->
        <div>
            <!-- Heading -->
            <PageTitle
                :title="data?.name ?? ''"
                back-to="/sources"
                :underline="true"
            >
                <template #labels>
                    <GameEditionBadge :edition="data?.game_edition as string"/>
                    <PublicationTypeBadge :type="data?.publication_type as string" />
                </template>
                <template #subtitle>
                    {{ data?.sourcebook_types?.join(' • ') }}
                </template>
            </PageTitle>
            <!-- /Heading -->

            <!-- Under Heading -->
            <div class="sourcebook-content">
                <!-- Left of "Under Heading" -->
                <div class="sourcebook-details">
                    <SourcebookDetailsList
                        :loading="!data"
                        :sourcebook="data as ISourcebook"
                    />
                    <SourcebookInTheBox
                        v-if="data.editions[0]?.boxed_set_datas?.length > 0"
                        :datas="data.editions[0]?.boxed_set_datas"
                    />
                    <ProductLinkButtonContainer
                        v-if="data?.product_ids?.length > 1"
                        :loading="!data"
                        :sourcebook="data as ISourcebook"
                    />
                </div>
                <!-- Left of "Under Heading" -->

                <!-- Right of "Under Heading -->
                <ProseContainer v-if="data" :text="data.description"/>
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
