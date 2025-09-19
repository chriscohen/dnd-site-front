<script setup lang="ts">

import {format, parseISO} from "date-fns";

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
    <div class="sourcebook-editions-tab">
        <dl>
            <template v-if="edition.pages">
                <dd>Pages</dd>
                <dt>{{edition.pages}}</dt>
            </template>

            <dd>First Released</dd>
            <dt>
                <template v-if="!edition.release_date_month_only">{{ day }}</template>
                {{ month }}
                {{ year }}
            </dt>

            <dd>Binding</dd>
            <dt>{{ edition.binding }}</dt>

            <template v-if="edition.isbn10">
                <dd>ISBN-10</dd>
                <dt>{{ formatIsbn(edition.isbn10) }}</dt>
            </template>

            <template v-if="edition.isbn13">
                <dd>ISBN-13</dd>
                <dt>{{ formatIsbn(edition.isbn13) }}</dt>
            </template>
        </dl>
    </div>
</template>

<style scoped lang="scss">
.sourcebook-editions-tab {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

dl {
    font-size: 1.25rem;
    width: 100%;

    dd, dt {
        display: inline-block;
        width: 50%;
    }
    dd {
        font-weight: 300;
    }
    dt {
        font-weight: 700;
        text-align: right;
        text-transform: capitalize;
    }
}
</style>
