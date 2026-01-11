<script setup lang="ts">
import type {MagicSchool} from "~/classes/magic/magicSchool";
import MagicSchoolImage from "~/components/magic-schools/MagicSchoolImage.vue";

const props = defineProps<{
    item?: MagicSchool
}>();
</script>

<template>
    <NuxtLink :to="'/magic-schools/' + item?.id" class="relative group bg-black/80 rounded-full">
        <MagicSchoolImage
            :school="item?.id ?? ''"
            class="w-full text-red-950 group-hover:text-red-800 transition-colors duration-300 ease-in-out"
        />
        <h3
            class="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-modesto opacity-0
            group-hover:opacity-100 scale-100 group-hover:scale-175 transition-all duration-500 ease-in-out
            text-shadow-lg/50"
        >
            {{ item?.name }}
        </h3>
    </NuxtLink>
</template>
