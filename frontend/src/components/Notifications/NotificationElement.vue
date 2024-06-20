<script setup lang="ts">
const props = defineProps(['title', 'text', 'color', 'icon'])
</script>
<template>
    <div class="flex items-center justify-center w-12" :class="`bg-${color}`" >
        <span v-html="icon"></span>
        <!-- <slot></slot> -->
    </div>

    <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
            <span class="font-semibold" :class="`text-${color}`">{{ title }}</span>
            <p class="text-sm text-gray-600">{{ text }}</p>
        </div>
    </div>
</template>