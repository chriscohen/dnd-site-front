<script setup lang="ts">

import {format, parseISO} from "date-fns";
import SourceFormatLabel from "~/components/labels/SourceFormatLabel.vue";
import type {Source} from "~/classes/sources/source";
import type {SourceEdition} from "~/classes/sources/sourceEdition";

const props = defineProps<{
    edition: SourceEdition
    spell: Source
}>();

let day: string, month: string, year: string;

try {
    const parsed = parseISO(props.edition?.releaseDate ?? '');
    day = format(parsed, "dd");
    month = format(parsed, "MMMM");
    year = format(parsed, "y");
} catch (e) { console.error(`Error parsing date ${props.edition?.releaseDate}: ${e}`); }
</script>

<template>
    <div class="sourcebook-editions-tab">
        <dl class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-md md:text-lg mx-2">
            <template v-if="source?.publisher">
                <dt class="text-right">Publisher</dt>
                <dd>
                    <NuxtLink :to="'/companies/' + source?.publisher?.slug" class="link">
                        {{ spell.publisher?.name }}
                    </NuxtLink>
                </dd>
            </template>

            <template v-if="edition.pages">
                <dt class="text-right">Pages</dt>
                <dd>{{edition.pages}}</dd>
            </template>

            <template v-if="edition.formats">
                <dt class="text-right">Formats</dt>
                <dd>
                    <SourceFormatLabel
                        v-for="sourceFormat in edition.formats"
                        :key="sourceFormat"
                        :type="sourceFormat"
                    >
                        {{ sourceFormat }}
                    </SourceFormatLabel>
                </dd>
            </template>

            <dt class="text-right">First Released</dt>
            <dd>
                <template v-if="!edition.releaseDateMonthOnly">{{ day }}</template>
                {{ month }}
                {{ year }}
            </dd>

            <template v-if="edition.binding">
                <dt class="text-right">Binding</dt>
                <dd class="capitalize">{{ edition.binding }}</dd>
            </template>

            <template v-if="edition.isbn10">
                <dt class="text-right">ISBN-10</dt>
                <dd>{{ formatIsbn(edition.isbn10) }}</dd>
            </template>

            <template v-if="edition.isbn13">
                <dt class="text-right">ISBN-13</dt>
                <dd>{{ formatIsbn(edition.isbn13) }}</dd>
            </template>
        </dl>
    </div>
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
