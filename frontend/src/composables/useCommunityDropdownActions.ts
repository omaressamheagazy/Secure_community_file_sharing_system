// src/composables/useCommunityActions.ts
import { COMMUNITY_ACTION } from '@/Enums/Action'
import communityApi from '@/services/API/community.api'
import { useCommunityStore } from '@/stores/CommunityStore'
import { inject } from 'vue'
import { CommunityServiceKey } from "@/symbols";
import { FileServiceKey } from '@/symbols'
import { useFileUploadCommunity } from '@/composables/File/useFileUploadCommunity';
import { useRouter } from 'vue-router'
import { notify } from 'notiwind'

export function useCommunityDropdownActions() {
    const communityStore = useCommunityStore()
    const fileService = inject(FileServiceKey)
    const communityService = inject(CommunityServiceKey)
    const router = useRouter()

    const handleCommunityDropdownActions = async (action: string, data?: any) => {
        switch (action) {
            case COMMUNITY_ACTION.createSubCommunity:
                const community = {
                    name: data.name,
                    description: data.description,
                    public_key: null,
                    private_key: null,
                    parent_id: communityStore.community.entity_id,
                }
                try {

                    const response = await communityApi.createCommunity(community)
                    const entity = response.data?.data
                    if (entity) {
                        // make the is_community field set to true
                        entity['is_community'] = true
                        // set the entity_id field to the id of the entity
                        entity['entity_id'] = entity.id
                        // increase the number of total communites by 1
                        communityStore.totalCommunities++
                        // add the new created entity to the entities to re-render the DOM 
                        communityStore.entites.push(entity)
                        //
                        notify({
                            title: "Success",
                            text: "Sub-community created successfully",
                            type: "success",
                            group: "app",
                        }, 4000)
                    }

                } catch (error) {
                    notify({
                        title: "Error",
                        text: error.response.data?.message ?? 'Unexpected error occured',
                        type: "error",
                        group: "app",
                    }, 4000)
                }

                break;
            case COMMUNITY_ACTION.uploadFile:
                console.log('Upload file action', data);
                data.parent_id = communityStore.community.entity_id
                try {
                    const communityKeyResponse = await communityService.getCommunityKeys(communityStore.community.root_id, communityStore.userMembershipkeys.privateKey)
                    const communityPublicKey = communityKeyResponse.data.data.public_key
                    console.log('communityKeyResponse', communityKeyResponse);

                    const response = await useFileUploadCommunity(fileService, communityPublicKey, data)
                    const file = response.data.data
                    console.log('response', response);
                    if (response) {
                        notify({
                            title: "Success",
                            text: "File uploaded successfully",
                            type: "success",
                            group: "app",
                        }, 4000)
                        file['is_community'] = false
                        file['entity_id'] = file.id
                        communityStore.totalFiles++
                        communityStore.entites.push(file)
                    }
                } catch (error) {
                    notify({
                        title: "Error",
                        text: error.response?.data?.message ?? 'Unexpected error occured',
                        type: "error",
                        group: "app",
                    }, 4000)
                }

                // ... (implementation remains the same)
                break
            case COMMUNITY_ACTION.edit:
                router.push({
                    name: 'communitySettings',
                    params: {
                        id: communityStore.community.entity_id
                    }
                })
                break
            default:
                break
        }
    }

    return {
        handleCommunityDropdownActions,
    }
}