<script setup lang="ts">
import type {Source} from "~/classes/sources/source";
import SourceFormatLabel from "~/components/labels/SourceFormatLabel.vue";
import {format, parseISO} from "date-fns";
import BaseCard from "~/components/cards/BaseCard.vue";

const props = defineProps<{
    class?: string
    loading?: boolean
    source?: Source;
}>();

const edition = props.source?.editions?.[0];

let day: string, month: string, year: string;

try {
    const parsed = parseISO(edition?.releaseDate ?? '');
    day = format(parsed, "dd");
    month = format(parsed, "MMMM");
    year = format(parsed, "y");
} catch (e) { console.error(`Error parsing date ${edition?.releaseDate}: ${e}`); }
</script>

<template>
    <BaseCard :class="props.class">
        <div class="sourcebook-editions-tab">
            <dl class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-md md:text-lg mx-2">
                <template v-if="source?.publisher">
                    <dt class="text-right">Publisher</dt>
                    <dd>
                        <NuxtLink v-if="!loading" :to="'/companies/' + source?.publisher?.slug" class="link">
                            {{ source?.publisher?.name }}
                        </NuxtLink>
                        <USkeleton v-else class="h-4 w-full"/>
                    </dd>
                </template>

                <template v-if="edition?.pages">
                    <dt class="text-right">Pages</dt>
                    <dd v-if="!loading">
                        {{edition.pages}}
                    </dd>
                    <dd v-else>
                        <USkeleton class="h-4 w-sm"/>
                    </dd>
                </template>

                <template v-if="edition?.formats">
                    <dt class="text-right">Formats</dt>
                    <dd v-if="!loading">
                        <SourceFormatLabel
                            v-for="sourceFormat in edition.formats"
                            :key="sourceFormat"
                            :type="sourceFormat"
                        >
                            {{ sourceFormat }}
                        </SourceFormatLabel>
                    </dd>
                    <dd v-else>
                        <USkeleton class="h-4 w-lg"/>
                    </dd>
                </template>

                <dt class="text-right">First Released</dt>
                <dd>
                    <template v-if="!edition?.releaseDateMonthOnly">{{ day }}</template>
                    {{ month }}
                    {{ year }}
                </dd>

                <template v-if="edition?.binding">
                    <dt class="text-right">Binding</dt>
                    <dd class="capitalize">{{ edition?.binding }}</dd>
                </template>

                <template v-if="edition?.isbn10">
                    <dt class="text-right">ISBN-10</dt>
                    <dd>{{ formatIsbn(edition.isbn10) }}</dd>
                </template>

                <template v-if="edition?.isbn13">
                    <dt class="text-right">ISBN-13</dt>
                    <dd>{{ formatIsbn(edition.isbn13) }}</dd>
                </template>
            </dl>
        </div>
        <!-- /Editions -->

        <!-- Campaign Setting logo -->
        <NuxtLink
            v-if="source?.campaignSetting?.logo"
            :to="'/campaign-settings/' + source?.campaignSetting?.slug">
            <img
                v-if="source?.campaignSetting?.logo?.url"
                class="max-w-[50%] mx-auto"
                :src="source?.campaignSetting?.logo?.url"
                :alt="source?.campaignSetting?.name + ' logo'">
        </NuxtLink>
        <!-- /Campaign Setting logo -->
    </BaseCard>
</template>

<style scoped lang="scss">
dl {
    dd, dt {
        text-wrap: nowrap;
    }
    dd {
        font-weight: 300;
    }
    dt {
        font-weight: 700;
        text-transform: capitalize;
    }
}
</style>
