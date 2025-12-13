<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";

useHead({
    bodyAttrs: { class: 'text-md md:text-lg' }
});
</script>

<template>
    <div id="outer">
        <header class="flex justify-between bg-gray-950">
            <slot name="header">
                <MainNavigation/>
                <EditionSelector/>
            </slot>
        </header>
        <slot name="pageTitle"/>
        <main class="h-screen max-h-screen overflow-hidden flex gap-8 overflow-y-scroll">
            <NuxtLoadingIndicator/>
            <div class="page-content md:mx-4">
                <slot/>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
@use '~/assets/css/tailwind.css';
@use '~/assets/css/default/styles';
</style>
