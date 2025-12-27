<script setup lang="ts">
import CharacterClassTeaser from "~/components/characterClasses/CharacterClassTeaser.vue";
import {useCharacterClassCache} from "~/stores/Store";
import PageTitle from "~/components/labels/PageTitle.vue";
import {
    type CharacterClass,
    createCharacterClass
} from "~/classes/characterClasses/characterClass";

const store = useCharacterClassCache();

const items = computed<CharacterClass[]>(() => store.listItems.map(createCharacterClass));

onMounted(() => store.loadMore());

useHead({ title: 'Classes' });
definePageMeta({ layout: false });
</script>

<template>
    <NuxtLayout name="default">
        <template #pageTitle>
            <PageTitle title="Classes" back-to="/" :underline="true"/>
        </template>

        <div class="page-container my-4 flex flex-col xl:flex-row overflow-y-scroll">
            <div class="left-container grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 gap-y-8">
                <CharacterClassTeaser
                    v-for="item in items.filter(item => !item.isPrestige)"
                    :key="item.id"
                    :data="item"
                />
            </div>

            <div class="right-container md:w-1/2">

            </div>
        </div>
    </NuxtLayout>
</template>

