// fileStore.js
import { defineStore } from 'pinia'
import { FileService } from '@/services/FileService'

export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: {
            data: null,
        }
    }),
    actions: {

        setFiles(response) {
            this.files.data = response.data
        },
    },
})