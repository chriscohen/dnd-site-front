<script setup lang="ts">
const props = defineProps<{
    edition?: ISpellEdition
}>();
</script>

<template>
    <span v-if="edition">
        <template v-if="!edition.has_saving_throw">None</template>

        <template v-else>{{ edition.saving_throw_type }} {{ edition.saving_throw_multiplier }}</template>
    </span>
</template>
