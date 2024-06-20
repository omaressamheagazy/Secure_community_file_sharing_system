import { ref, watch, inject } from 'vue';
import { useRoute } from 'vue-router';
import communityApi from '@/services/API/community.api';
import { CommunityServiceKey } from "@/symbols";

import { useCommunityStore } from '@/stores/CommunityStore';
import { useAuthStore } from '@/stores/AuthStore';

export function useCommunityDetails() {
    const communityService = inject(CommunityServiceKey);
    const route = useRoute();
    const communityStore = useCommunityStore();
    const authStore = useAuthStore();

    async function fetchCommunityDetails(communityId: number) {
        try {
            // fetch the community details
            const response = await communityApi.getCommunityDetails(communityId);
            const responseData = response.data.data;
            // set the community details in the store
            communityStore.community = responseData.parent;
            communityStore.community.root_id = responseData.ancestors[0].entity_id;
            communityStore.entites = responseData.entites;
            communityStore.breadcrumbItems = responseData.ancestors;
            communityStore.totalFiles = responseData.total_files;
            communityStore.totalCommunities = responseData.total_communities;

            if (!communityStore.userMembershipkey) {
                const rootCommunityId = responseData.ancestors[0].entity_id;
                communityStore.userMembershipkeys = await communityService.fetchDecryptedMembershipKey(rootCommunityId, authStore.getKeyPair().privateKey)
            }
        } catch (error) {
            console.log(error);
        }
    }

    watch(() => route.params.id, (newId) => {
        if (newId) {
            fetchCommunityDetails(Number(newId));
        }
    });
    // Initial fetch on component mount
    if (route.params.id) {
        fetchCommunityDetails(Number(route.params.id));
    }

}
