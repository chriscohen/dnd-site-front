<script setup>
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import SidebarNavigation from "~/components/navigation/SidebarNavigation.vue";

const magicSchoolStore = useMagicSchoolStore();
magicSchoolStore.getAll();
</script>

<template>
    <UApp>
        <div id="header">
            <MainNavigation/>
            <EditionSelector/>
        </div>
        <div id="page">
            <SidebarNavigation/>
            <NuxtLoadingIndicator/>
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
