<script setup lang="ts">
import InputGroup from '@/components/Forms/InputGroup.vue'
const props = defineProps(['buttonName', 'community'])
</script>
<template>
    <form @submit.prevent="$emit('submitForm')">
        <div class="p-6.5">
            <InputGroup label="Name" v-model="community.name" type="text" placeholder="Enter the community name"
                customClasses="mb-4.5" required />
            <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Description </label>
                <textarea v-model="community.description" rows="6" placeholder="Describe your community here..."
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
            </div>
            <button class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                {{ buttonName }}
            </button>
        </div>
    </form>
</template>