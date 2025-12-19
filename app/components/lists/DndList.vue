<script setup lang="ts">
const props = defineProps<{

}>();
</script>

<template>
    <section class="overflow-hidden h-full max-h-full bg-black/50 rounded-xl p-4">
        <slot name="heading"/>

        <ul class="overflow-scroll h-full"><slot/></ul>
    </section>
</template>
