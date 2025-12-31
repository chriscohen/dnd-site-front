<script setup lang="ts">
import DndCollapsible from "~/components/containers/DndCollapsible.vue";
import PersonLabel from "~/components/labels/PersonLabel.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import type {SourceEdition} from "~/classes/sources/sourceEdition";
import type {Person} from "~/classes/person";

const props = defineProps<{
    edition?: SourceEdition
}>();
</script>

<template>
    <DndCollapsible v-if="edition?.credits" :start-open="true" title="Credits">
        <div v-for="role in Object.keys(edition.creditsByRole())" :key="role">
            <DndHeading size="3" underline class="mt-2">{{ role }}</DndHeading>

            <div class="mt-2 [&>span:not(:last-child)]:after:content-[','] [&>span:not(:last-child)]:mr-1">
                <PersonLabel
                    v-for="person in edition.creditsByRole()[role] as Person[]"
                    :key="person.slug"
                    :person="person"
                />
            </div>
        </div>
    </DndCollapsible>
</template>
