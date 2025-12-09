<script setup lang="ts">
import GameEditionBadge from "~/components/badges/GameEditionBadge.vue";
import PublicationTypeBadge from "~/components/badges/PublicationTypeBadge.vue";
import SourcebookDetailsList from "~/components/lists/SourcebookDetailsList.vue";
import ProseContainer from "~/components/text/ProseContainer.vue";
import MediaLarge from "~/components/media/MediaLarge.vue";
import ProductLinkButtonContainer from "~/components/containers/ProductLinkButtonContainer.vue";
import PageTitle from "~/components/labels/PageTitle.vue";
import {useFetch} from "#app";

const route = useRoute();
const store = useSourcebookCache();
const path = `http://localhost:8080/api/source/${route.params.slug}?mode=full`;

const item = computed(() => store.get(path));

if (!item.value) {
    console.log('Fetching sourcebook...');
    const { data, error } = await useFetch<ISourcebook>(path, {
    });
    console.log('Response:', data.value);


    if (error.value) {
        throw createError({statusCode: 404, statusMessage: error.value.message});
    }

    if (data.value) {
        store.set(path, data.value);
    }
}
</script>

<template>
    <div v-if="item" class="sourcebook">
        <!-- Left: Cover Art -->
        <MediaLarge
            :name="item.name"
            :cover-image="item.cover_image"
        />
        <!-- /Left: Cover Art -->

        <!-- Right Side -->
        <div>
            <!-- Heading -->
            <PageTitle
                :title="item.name ?? ''"
                back-to="/sources"
                :underline="true"
            >
                <template #labels>
                    <GameEditionBadge :edition="item.game_edition as string"/>
                    <PublicationTypeBadge :type="item?.publication_type as string" />
                </template>
                <template #subtitle>
                    {{ item?.sourcebook_types?.join(' • ') }}
                </template>
            </PageTitle>
            <!-- /Heading -->

            <!-- Under Heading -->
            <div class="sourcebook-content">
                <!-- Left of "Under Heading" -->
                <div class="sourcebook-details">
                    <SourcebookDetailsList
                        :sourcebook="item"
                    />
                    <ProductLinkButtonContainer
                        v-if="item.product_ids?.length > 1"
                        :sourcebook="item"
                    />
                </div>
                <!-- Left of "Under Heading" -->

                <!-- Right of "Under Heading -->
                <ProseContainer :text="item.description"/>
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
