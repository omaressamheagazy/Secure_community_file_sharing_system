<script setup lang="ts">
import ModalOne from '@/components/Modals/ModalOne.vue'
import { ref } from 'vue';
const emit = defineEmits(['getFileData'])
const fileInput = ref(null)
function sendFileData() {
    emit('getFileData', fileInput.value.files[0])
}
</script>
<template>
    <ModalOne title="Upload File" modalName="upload file" buttonName="Upload" @submit="sendFileData">
        <div class="flex flex-col gap-5.5 p-6.5">
            <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attach file
                </label>
                <input type="file" ref="fileInput"
                    class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
            </div>
        </div>
    </ModalOne>
</template>