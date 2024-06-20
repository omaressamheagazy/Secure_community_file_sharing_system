<script setup lang="ts">
import { onMounted, ref, provide, inject } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableSix from '@/components/Tables/TableSix.vue'
import { useFileStore } from '@/stores/FileStore.ts';
import { useFileRetriever } from '@/composables/File/useFileRetriever';
import { ACTION } from '@/Enums/Action.ts';
import { FileServiceKey } from '@/symbols';
const fileService = inject(FileServiceKey)
const fileStore = useFileStore()

const handleAction = async (action: string, fileId: number) => {
    switch (action) {
        case ACTION.download:
            try {
                // proccess the retrival of the file (include the dcryption of the file )
                const file = await useFileRetriever(fileService, fileId)
                fileService.downloadFile(file)
            } catch (error) {
                console.log(error);
            }
            break;
        case ACTION.update:
            break;
        default:
            break
    }
};
async function showAllFiles() {
    try {
        const files = await fileService.getAllFiles()
        console.log('response is', files);
        if (files)
            fileStore.setFiles(files.data)

    } catch (error) {
        console.log(error);

    }
}
showAllFiles()

provide('triggerAction', handleAction);

const pageTitle = ref('All files')
</script>

<template>
        <!-- Breadcrumb Start -->
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <!-- Breadcrumb End -->

        <div class="flex flex-col gap-10">
            <TableSix :files="fileStore.files.data" />
        </div>
</template>
