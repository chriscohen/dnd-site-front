<script setup lang="ts">

import type {NavigationMenuItem} from "#ui/components/NavigationMenu.vue";

const campaignSettings = ref([] as ICampaignSetting[]);
const items = ref<NavigationMenuItem[]>([
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Items',
        to: '/items',
    },
    {
        label: 'Sources',
        to: '/sources',
    },
    {
        label: 'Campaign Settings',
        to: '/campaign-settings',
        children: []
    }
]);
const campaignSettingStore = useCampaignSettingStore();

callOnce(campaignSettingStore.getAll)
    .then(() => {
        campaignSettings.value = campaignSettingStore.getAll();
        items.value.find((navItem) => navItem.label === 'Campaign Settings').children = campaignSettings.value.map((item: ICampaignSetting) => {
            return { label: item.name, to: '/campaign-settings/' + item.slug, logo: item.logo };
        });
    });
</script>

<template>
    <nav role="navigation">
        <ul class="flex font-[Mrs_Eaves] text-3xl text-gray-400 mb-8 pt-4">
            <li v-for="item in items" :key="item.to as string" class="group">
                <ULink
                    :to="item.to"
                    :class="'px-4 border-b-1 border-solid border-gray-300 text-gray-400 transition-[background] ease-in-out duration-250 group-hover:bg-gray-100 group-hover:border-gray-100 group-hover:text-gray-900'"
                >
                    {{ item.label }}
                </ULink>
                <ul v-if="campaignSettings.length" class="dropdown absolute bg-gray-800/90 w-72 transition-[opacity] duration-5000 ease-in-out invisible opacity-0 hidden group-hover:visible group-hover:opacity-100 group-hover:block">
                    <li v-for="child in item.children" :key="child.to" :class="'clear-both w-full text-2xl transition-[background, color] duration-500 ease-in-out hover:bg-gray-50/20'">
                        <ULink
                            :to="child.to"
                            class="px-4 inline-block text-gray-400 hover:text-gray-200 w-full"
                        >
                            {{ child.label }}
                        </ULink>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>

</template>
