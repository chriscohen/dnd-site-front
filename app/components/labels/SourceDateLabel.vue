<script setup lang="ts">
import {format, parseISO} from "date-fns";
import LabelBase from "~/components/labels/LabelBase.vue";

const props = defineProps({
    date: { type: String, required: true },
    showDay: { type: Boolean, default: true }
});

let day: string, month: string, year: string;

try {
    const parsed = parseISO(props.date);
    day = format(parsed, "dd");
    month = format(parsed, "MMMM");
    year = format(parsed, "y");
} catch (e) { console.error(e); }
</script>

<template>
  <LabelBase v-if="props.date" label-type="date-label" color="red" opacity="30">
      <span v-if="props.showDay" class="label-day">{{ day }}</span>
      <span class="label-month">{{ month }}</span>
      <span class="label-year text-3xl block text-center -mt-2">{{ year }}</span>
  </LabelBase>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';

aside.label {
    background-color: colors.$red-500-20;

    > span {
        display: block;
        text-align: center;
    }

    > .label-day {
        font-size: 4rem;
        margin-bottom: -2rem;
    }
    > .label-month {
        @include fonts.mrs-eaves;
        font-size: 2rem;
        margin-bottom: -0.75rem;
    }
    > .label-year {
        font-size: 2.5rem;
    }
}
</style>
