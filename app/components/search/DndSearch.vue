<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import {DATA_TYPES} from "~/utils/utils";

const router = useRouter();
const store = useSearchStore();
const isOpen: Ref<boolean> = ref(false);

// Local state.
const containerRef = ref(null);
const showResults = ref<boolean>(false);

function onInput(input: string) {
    store.query = input;
    showResults.value = true;
}

function onSelect(option) {
    navigateTo('/campaign-settings/' + option.slug);
}

onClickOutside(containerRef, () => {
    showResults.value = false;
});

function onFocus() {
    if (store.results.length > 0) showResults.value = true;
}

</script>

<template>
    <div ref="containerRef" class="relative w-full max-w-md my-2">
        <UInput
            variant="none"
            class="w-full bg-gray-800 text-lg border-b-2 border-b-red-800 [&_input]:text-lg md:[&_input]:text-2xl
                font-light"
            :model-value="store.query"
            icon="i-lucide-search"
            placeholder="Search anything..."
            autocomplete="off"
            :loading="store.isLoading"
            @update:model-value="onInput"
            @focus="onFocus"
        />

        <ul
            v-if="showResults && store.results.length > 0"
            class="absolute bg-gray-950 block top-full left-0 w-full mt-2 max-h-[75dvh] overflow-y-scroll shadow-md/50"
        >
            <li v-for="item in store.results" :key="item.id">
                <a
                    href="#"
                    class="block text-left px-4 py-2 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200
                        ease-in-out"
                >
                    <span class="block text-xl">{{ item.name}}</span>
                    <span class="block font-[mrs-eaves] uppercase text-sm font-normal text-gray-300">
                        {{ DATA_TYPES[item.type]?.name }}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>
