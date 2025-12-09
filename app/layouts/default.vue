<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import SidebarNavigation from "~/components/navigation/SidebarNavigation.vue";
</script>

<template>
    <div id="outer">
        <div id="header">
            <MainNavigation/>
            <EditionSelector/>
        </div>
        <div id="page">
            <SidebarNavigation/>
            <NuxtLoadingIndicator/>
            <slot/>
        </div>
    </div>
</template>

<style lang="scss">
@forward '~/assets/css/default/styles';
</style>
