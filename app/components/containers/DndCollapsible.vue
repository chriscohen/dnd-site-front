<script setup lang="ts">
const props = defineProps<{
    class?: string
    startOpen?: boolean
    title: string
}>();

const open: Ref<boolean> = ref(props.startOpen ?? false);
</script>

<template>
    <UCollapsible
        v-model:open="open"
        class="rounded-lg bg-black/50 text-lg px-4 py-2"
        :class="props?.class"
    >
        <h2 class="font-eaves text-4xl border-b-2 border-red-800 flex justify-between cursor-pointer">
            {{ title }}
            <UButton
                leading-icon="i-lucide-chevron-down"
                size="xl"
                class="group"
                :ui="{
                    trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                }"
            />
        </h2>

        <template #content>
            <slot/>
        </template>
    </UCollapsible>
</template>
