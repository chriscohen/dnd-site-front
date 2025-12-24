<script setup lang="ts">
import CharacterClassTeaser from "~/components/characterClasses/CharacterClassTeaser.vue";
import {useCharacterClassCache} from "~/stores/Store";
import {API_URL} from "#imports";
import PageTitle from "~/components/labels/PageTitle.vue";
import {type CharacterClassApiResponse, createCharacterClass} from "~/classes/characterClasses/characterClass";

useHead({
    title: 'Classes'
});
definePageMeta({
    layout: false
});

const store = useCharacterClassCache();
const path = API_URL + '/classes?mode=full';
const data: CharacterClassApiResponse[] = await store.get(path) as CharacterClassApiResponse[];
const items = data.map(createCharacterClass);
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

