<script setup lang="ts">
import DateLabel from "~/components/labels/DateLabel.vue";
import BindingLabel from "~/components/labels/BindingLabel.vue";
import IsbnLabel from "~/components/labels/IsbnLabel.vue";
import PagesLabel from "~/components/labels/PagesLabel.vue";

const props = defineProps({
    edition: { type: Object as () => ISourcebookEdition, required: true },
});
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <PagesLabel v-if="props.edition.pages !== null" :pages="props.edition.pages"/>
        <DateLabel :date="props.edition.release_date" :show-day="!props.edition.release_date_month_only"/>
        <BindingLabel :binding="props.edition.binding"/>
        <IsbnLabel :isbn10="props.edition.isbn10" :isbn13="props.edition.isbn13"/>
    </div>
</template>
