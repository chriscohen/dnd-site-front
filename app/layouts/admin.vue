<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import SidebarNavigation from "~/components/navigation/SidebarNavigation.vue";
</script>

<template>
    <div id="outer" class="admin">
        <div id="header">
            <MainNavigation/>
        </div>
        <div id="page">
            <SidebarNavigation/>
            <NuxtLoadingIndicator/>
            <slot/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#header {
    display: flex;
    justify-content: space-between;
}
</style>
