<script setup>
import MainNavigation from "~/components/navigation/MainNavigation.vue";
useHead({
    bodyAttrs: {
        class: [
            'font-[Bookmania]',
            'text-[18px]',
            'text-gray-200',
            'bg-black',
            'bg-radial',
            'from-gray-700',
            'to-gray-950',
            'dark'
        ]
    }
});
</script>

<template>
    <UApp>
        <div class="bg-cover w-full h-full px-8">
            <MainNavigation/>
            <NuxtPage/>
        </div>
    </UApp>
</template>
