<script setup lang="ts">
const props = defineProps<{
    link?: boolean
    school?: IMagicSchool
}>();
</script>

<template>
    <span v-if="school" class="magic-school-label">
        <template v-if="school.parent">
            <NuxtLink v-if="props.link" :to="'/magic-school/' + school.parent.name" class="link text-dark">
                {{ school.parent.name }}
            </NuxtLink>
            <template v-else>{{ school.parent.name }}</template>

            (<NuxtLink v-if="props.link" :to="'/magic-school/' + school.name" class="link text-dark">
                {{ school.name }}
            </NuxtLink>
            <template v-else>({{ school.name }}</template>)
        </template>

        <template v-else>
            <NuxtLink v-if="props.link" :to="'/magic-school/' + school.name" class="link text-dark">
                {{ school.name }}
            </NuxtLink>
            <template v-else>{{ school.name }}</template>
        </template>
    </span>
</template>
