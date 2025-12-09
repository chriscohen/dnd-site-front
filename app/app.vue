<script setup>
import {useLanguageCache} from "~/stores/Store.ts";

const store = useLanguageCache();
const languagesPath = '/data/types/languages.json';

// Initialize the app.
onMounted(async () => {
    const response = await fetch(languagesPath);
    if (!response) throw new Error(`"${languagesPath}" not found.`);
    const data = await response.json();
    store.set(data);
    console.log('Finished loading languages (' + store.items.length + ').')
});
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </UApp>
</template>

<style scoped lang="scss">
#header {
    display: flex;
    align-items: center;
}
</style>
