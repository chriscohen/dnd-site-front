<script setup lang="ts">
import CharacterClassTeaser from "~/components/characterClasses/CharacterClassTeaser.vue";
import {useCharacterClassCache} from "~/stores/Store";
import {API_URL} from "#imports";
import PageTitle from "~/components/labels/PageTitle.vue";

const store = useCharacterClassCache();
const path = API_URL + '/classes?mode=full';
await store.fetch(path);
const items: ICharacterClass[] = computed(() => store.get(path));
</script>

<template>
    <div v-if="items" class="page-content">
        <PageTitle title="Classes" back-to="/" :underline="true"/>

        <div class="page-container my-4 flex flex-col md:flex-row overflow-y-scroll">
            <div class="left-container md:w-1/2">
                <CharacterClassTeaser
                    v-for="item in items.filter(item => !item.is_prestige)"
                    :key="item.id"
                    :data="item"
                />
            </div>

            <div class="right-container md:w-1/2">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/css/default/layout';

.left-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 50%;
}
.right-container {
    display: flex;
    width: 50%;
}
</style>
