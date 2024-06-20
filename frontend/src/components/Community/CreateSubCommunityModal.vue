<script setup lang="ts">
import ModalOne from '@/components/Modals/ModalOne.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
const emit = defineEmits(['getSubCommunityData'])

let communityData = {
    name: '',
    description: ''
}
function sendCommunityData() {
    emit('getSubCommunityData', communityData)
}
</script>
<template>
    <ModalOne title="New sub-community" modalName="new sub-community" buttonName="create" @submit="sendCommunityData">
        <form>
            <div class="p-6.5">

                <InputGroup v-model="communityData.name" label="Name" type="text" placeholder="Enter the community name" customClasses="mb-4.5"
                    required />

                <div class="mb-6">
                    <label class="mb-2.5 block text-black dark:text-white"> Description </label>
                    <textarea v-model="communityData.description" rows="6" placeholder="Describe your community here..."
                        class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                </div>

            </div>
        </form>
    </ModalOne>
</template>