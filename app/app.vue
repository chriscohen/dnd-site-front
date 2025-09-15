<script setup>
import MainNavigation from "~/components/navigation/MainNavigation.vue";
</script>

<template>
    <UApp>
        <div class="bg-cover w-full h-full px-8">
            <div id="header">
                <MainNavigation/>
                <EditionSelector/>
            </div>
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
