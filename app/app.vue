<script setup>
import MainNavigation from "~/components/navigation/MainNavigation.vue";
useSeoMeta({
    title: '[title]',
    description: '[description]',
    ogTitle: '[og:title]',
    ogDescription: '[og:description]',
    ogImage: '[og:image]',
    ogUrl: '[og:url]',
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary'
});
useHead({
    bodyAttrs: {
        class: [
            'dark'
        ]
    },
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
        }
    ]
});
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
