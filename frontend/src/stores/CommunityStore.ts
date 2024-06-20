import { defineStore } from 'pinia'
import { GUEST } from "@/Enums/guest"
import router from "@/router"

export const useCommunityStore = defineStore("communityStore", {

    state: () => ({
        community: {
            id:null,
            root_id:null,
            name:'',
            entity_id: null,
            path:'',
        },
        totalCommunities: 0,
        totalFiles : 0,
        userMembershipkeys: null,
        entites : [],
        breadcrumbItems : [],
    }),
    actions: {
        
    }
})