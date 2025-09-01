<script setup lang="ts">
import {format, parseISO} from "date-fns";
import LabelBase from "~/components/labels/LabelBase.vue";

const props = defineProps({
    date: { type: String, required: true },
    showDay: { type: Boolean, default: true }
});
const parsed = parseISO(props.date);
const day = format(parsed, "dd");
const month = format(parsed, "MMMM");
const year = format(parsed, "y");
</script>

<template>
  <LabelBase label-type="date-label" color="red" opacity="30">
      <span v-if="true || props.showDay" class="text-6xl block text-center -mb-2">{{ day }}</span>
      <span class="uppercase block text-center font-[Mrs_Eaves]">{{ month }}</span>
      <span class="text-3xl block text-center -mt-2">{{ year }}</span>
  </LabelBase>
</template>
