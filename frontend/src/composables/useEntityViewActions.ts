import { useRouter } from 'vue-router'
import { FileServiceKey } from '@/symbols';
import { CommunityServiceKey } from "@/symbols";
import { useCommunityStore } from '@/stores/CommunityStore';
import { inject } from 'vue';
import { useFileRetrieverCommunity } from './File/useFileRetrieverCommunity';
export function useEntityViewActions() {
    const router = useRouter()
    const fileService = inject(FileServiceKey)
    const communityStore = useCommunityStore()
    const communityService = inject(CommunityServiceKey);

    async function handleEntityViewAction(entityId: number, is_community: Boolean) {
        if (is_community) {
            router.replace({ name: 'communityDetails', params: { id: entityId } })
        } else {
            const communityKeyResponse = await communityService?.getCommunityKeys(communityStore.community.root_id)
            console.log(communityKeyResponse);
            const encryptedCommunityPrivateKey = communityKeyResponse.data.data.private_key
            // get the memberhsip key from the store
            const membershipKey = communityStore.userMembershipkeys
            // decrypt the community private key
            const decryptedCommunityPrivateKey = await communityService?.decryptCommunityPrivateKey(encryptedCommunityPrivateKey, membershipKey)
            console.log(decryptedCommunityPrivateKey);
            
            const file = await useFileRetrieverCommunity(fileService, decryptedCommunityPrivateKey ,entityId)
            fileService.downloadFile(file)
        }
    }
    return {
        handleEntityViewAction,
    }
}
