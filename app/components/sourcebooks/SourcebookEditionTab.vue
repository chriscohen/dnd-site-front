<script setup lang="ts">

import {format, parseISO} from "date-fns";
import {ucFirst} from "~/utils/utils";

const props = defineProps({
    edition: { type: Object as () => ISourcebookEdition, required: true },
});

let day: string, month: string, year: string;

try {
    const parsed = parseISO(props.edition.release_date);
    day = format(parsed, "dd");
    month = format(parsed, "MMMM");
    year = format(parsed, "y");
} catch (e) { console.error(e); }
</script>

<template>
    <div class="sourcebook-editions-tab flex gap-4 flex-wrap">
        <dl class="w-full text-md md:text-lg">
            <template v-if="edition.pages">
                <dt>Pages</dt>
                <dd>{{edition.pages}}</dd>
            </template>

            <dt>First Released</dt>
            <dd>
                <template v-if="!edition.release_date_month_only">{{ day }}</template>
                {{ month }}
                {{ year }}
            </dd>

            <template v-if="edition.binding">
                <dt>Binding</dt>
                <dd>{{ ucFirst(edition.binding) }}</dd>
            </template>

            <template v-if="edition.isbn10">
                <dt>ISBN-10</dt>
                <dd>{{ formatIsbn(edition.isbn10) }}</dd>
            </template>

            <template v-if="edition.isbn13">
                <dt>ISBN-13</dt>
                <dd>{{ formatIsbn(edition.isbn13) }}</dd>
            </template>
        </dl>
    </div>
</template>

<style scoped lang="scss">
dl {
    dd, dt {
        display: inline-block;
        width: 50%;
        text-wrap: nowrap;
    }
    dd {
        display: inline-block;
        font-weight: 300;
    }
    dt {
        font-weight: 700;
        text-align: right;
        text-transform: capitalize;
    }
}
</style>
