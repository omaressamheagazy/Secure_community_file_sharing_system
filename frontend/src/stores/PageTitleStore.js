import { defineStore } from 'pinia'
export const usePageTitleStore = defineStore("pageTtileStore", {
    state: () => ({
        title: 'test'
    })
});