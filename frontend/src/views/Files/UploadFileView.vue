<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { ref, inject } from 'vue'
import { FileServiceKey } from '@/symbols'
import { useFileUpload } from '@/composables/File/useFileUpload'
import { notify } from 'notiwind'

const pageTitle = ref('Upload files')
const fileInput = ref(null)
const fileService = inject(FileServiceKey)
console.log(fileService);

async function handleUploadedFiles() {
    try {
        // Get the selected file
        const selectedFile = fileInput.value.files[0];
        const response = await useFileUpload(fileService, selectedFile);
        if (response) {
            notify({
            title: "Success",
            text: 'File uploaded successfully',
            type: "success",
            group: "app",
        }, 4000)
        }
        console.log(response);

    } catch (error) {
        notify({
            title: "Error",
            text: error.response.data?.message ?? 'Unexpected error occured',
            type: "error",
            group: "app",
        }, 4000)
    }
}


</script>

<template>
        <!-- Breadcrumb Start -->
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <!-- Breadcrumb End -->

        <!-- ====== Form Elements Section Start -->
        <div class="grid grid-cols-1 gap-9 lar:grid-cols-4">
            <div class="flex flex-col gap-9">
                <!-- File upload input Start -->
                <DefaultCard cardTitle="File upload">
                    <div class="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Attach file
                            </label>
                            <input type="file" ref="fileInput"
                                class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                            <!-- <div class="my-7.5 flex flex-wrap gap-5 xl:gap-20 justify-center">
                                <ButtonDefault  route="/" label="Upload File"
                                    customClasses="bg-primary text-white rounded-md" />
                            </div> -->
                            <div class="mb-5 mt-6">
                                <input type="submit" value="Upload file" @click="handleUploadedFiles"
                                    class="w-3/12 cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90" />
                            </div>

                        </div>
                    </div>
                </DefaultCard>
                <!-- File upload input End -->
            </div>


        </div>
        <!-- ====== Form Elements Section End -->
</template>
