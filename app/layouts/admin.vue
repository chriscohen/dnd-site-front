<script setup lang="ts">
import MainNavigation from "~/components/navigation/MainNavigation.vue";
</script>

<template>
    <div id="outer" class="admin">
        <div id="header">
        </div>
        <div id="page">
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
