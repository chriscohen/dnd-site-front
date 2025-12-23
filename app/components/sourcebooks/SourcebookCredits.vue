<script setup lang="ts">
import DndCollapsible from "~/components/containers/DndCollapsible.vue";
import PersonLabel from "~/components/labels/PersonLabel.vue";
import DndHeading from "~/components/headings/DndHeading.vue";

const props = defineProps<{
    edition?: SourcebookEditionApiResponse
}>();

const open = ref(true);
</script>

<template>
    <DndCollapsible v-if="edition?.credits" :start-open="true" title="Credits">
        <div v-for="role in Object.keys(edition.credits)" :key="role">
            <DndHeading size="3" underline class="mt-2">{{ role }}</DndHeading>

            <div class="mt-2 [&>span:not(:last-child)]:after:content-[','] [&>span:not(:last-child)]:mr-1">
                <PersonLabel
                    v-for="person in edition.credits[role] as PersonApiResponse[]"
                    :key="person.slug"
                    :person="person"
                />
            </div>
        </div>
    </DndCollapsible>
</template>
