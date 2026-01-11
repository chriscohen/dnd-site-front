<script setup lang="ts">
import type {MagicSchool} from "~/classes/magic/magicSchool";
import MagicSchoolImage from "~/components/magic-schools/MagicSchoolImage.vue";
import BaseCard from "~/components/cards/BaseCard.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import BaseButton from "~/components/buttons/BaseButton.vue";

const props = defineProps<{
    item?: MagicSchool
}>();

const colors = {
    blue: "bg-blue-700",
    gray: "bg-gray-700",
    green: "bg-green-700",
    orange: "bg-orange-700",
    pink: "bg-pink-700",
    purple: "bg-purple-700",
    red: "bg-red-700",
    yellow: "bg-yellow-700"
};
</script>

<template>
    <BaseCard class="flex flex-col h-full">
        <DndHeading size="2" underline>
            {{ item?.name }}

            <template #controls>
                <MagicSchoolImage :school="item?.id ?? ''" :color="colors[item?.color]" class="w-8 h-8"/>
            </template>
        </DndHeading>

        <div class="prose mt-4 mb-2">
            {{ item?.description }}
        </div>
        <div class="flex flex-row justify-end mt-auto border-t border-red-800">
            <BaseButton icon="i-lucide-chevron-right" label="more" class="mt-4"/>
        </div>
    </BaseCard>
</template>
