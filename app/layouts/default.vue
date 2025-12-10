<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
import SidebarNavigation from "~/components/navigation/SidebarNavigation.vue";
</script>

<template>
    <div id="outer">
        <div id="header" class="bg-slate-900 border-b-1 border-gray-600">
            <MainNavigation/>
            <EditionSelector/>
        </div>
        <div id="page">
            <NuxtLoadingIndicator/>
            <slot/>
        </div>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/tailwind.css';
@use '~/assets/css/default/styles';
</style>
