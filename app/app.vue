<script setup>
    const store = useMagicSchoolStore();
    await callOnce(store.getMagicSchools);
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtPage/>

        <MagicSchoolNav/>
        <Icon name="dnd:acid" class="primary"/>
    </div>
</template>
