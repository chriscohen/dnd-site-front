<script setup lang="ts">
const props = defineProps<{

}>();
</script>

<template>
    <section>
        <slot name="heading"/>

        <ul><slot/></ul>
    </section>
</template>
