<script setup>
import MainNavigation from "~/components/navigation/MainNavigation.vue";

const magicSchoolStore = useMagicSchoolStore();
magicSchoolStore.getAll();
</script>

<template>
    <UApp>
        <div id="header">
            <MainNavigation/>
            <EditionSelector/>
        </div>
        <div id="content">
            <NuxtPage/>
        </div>
    </UApp>
</template>

<style scoped lang="scss">
#header {
    display: flex;
    align-items: center;
}
</style>
