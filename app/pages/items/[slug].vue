<script setup lang="ts">
const route = useRoute();
const itemStore = useItemStore();

const item = itemStore.getBySlug(route.params.slug as string);
</script>

<template>
    <div class="source">
        <div class="flex items-start gap-16">
            <!-- Left: Cover Art -->
            <div class="d-effect max-w-[30%]">
                <img v-if="item.category && item.category.image" :src="item.category.image.url" alt="sdfsklj">
            </div>
            <!-- /Left: Cover Art -->

            <!-- Right Side -->
            <div>
                <!-- Heading -->
                <div class="flex items-end border-b-1 border-gray-400 mb-4">
                    <NuxtLink to="/items">
                        <Icon name="lucide:chevron-left" class="text-gray-500 hover:text-gray-200 hover:animate-bounce-left" size="3rem" />
                    </NuxtLink>
                    <h1 class="font-[Modesto_Condensed] text-6xl mr-8">{{ item?.name}}</h1>
                </div>
                <!-- /Heading -->

                <!-- Under Heading -->
                <div class="grid grid-cols-3 gap-16">
                    <!-- Left of "Under Heading" -->
                    details
                    <!-- Left of "Under Heading" -->

                    <!-- Right of "Under Heading -->
                    <div v-if="item.editions[0]" class="col-span-2 markdown" v-html="item.editions[0].description"/>
                    <!-- Right of "Under Heading -->
                </div>
                <!-- /Under Heading -->
            </div>
            <!-- /Right Side -->
        </div>
    </div>
</template>
