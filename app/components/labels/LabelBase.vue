<script setup lang="ts">
 const props = defineProps({
     labelType: { type: String, required: true },
     brightness: { type: String, default: '' },
     color: { type: String, default: 'gray' },
     opacity: { type: String, default: '20' }
 })

 const useColorBrightness = props.color != 'white' && props.color != 'black';
 const brightness = props.brightness == '' ? (props.color == 'gray' ? '50' : '500') : props.brightness;

 // Eg, bg-gray-50/10 or bg-red-500/30
 const pieces = [
     'bg-',
     props.color,
     useColorBrightness ? '-' + brightness : '',
     '/',
     props.opacity,
 ];
</script>

<template>
    <aside :class="props.labelType + ' ' + pieces.join('') + ' p-2 inline-block grow items-center'">
        <slot/>
    </aside>
</template>
