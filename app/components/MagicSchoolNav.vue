<script setup lang="ts">

const store = useMagicSchoolStore();
await callOnce(store.getAll);

</script>

<template>
    <ul>
        <li v-for="item in store.magicSchools" :key="item.id">
            <img :src="'/images/magic-schools/' + item.id + '.webp'" :alt="item.name + ' icon'">
            {{ item.name }}
        </li>
    </ul>
</template>
