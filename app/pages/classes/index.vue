<script setup lang="ts">
import CharacterClassTeaser from "~/components/characterClasses/CharacterClassTeaser.vue";
import ConjuringScreen from "~/components/loading/ConjuringScreen.vue";

const store = useCharacterClassStore();
const persistedStore = usePersistedStore();
const api = useApi(store);

api.get({
    type: 'classes',
    mode: RenderMode.FULL,
    multiple: true
});
</script>

<template>
    <div v-if="store.empty(RenderMode.FULL)" class="page-container">
        <ConjuringScreen/>
    </div>
    <div v-else class="page-container">
        <div class="left-container">
            <CharacterClassTeaser
                v-for="item in store.getAll(RenderMode.FULL).filter((c: ICharacterClass) => !c.is_prestige)"
                :key="item.id"
                :data="item"
            />
        </div>

        <div class="right-container">

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
