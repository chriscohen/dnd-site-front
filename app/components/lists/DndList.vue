<script setup lang="ts">
const props = defineProps<{

}>();
</script>

<template>
    <section class="bg-black/50 rounded-xl p-4">
        <slot name="heading"/>

        <ul class="overflow-scroll h-full mb-4"><slot/></ul>
    </section>
</template>
