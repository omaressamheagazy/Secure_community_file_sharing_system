<script setup lang="ts">
import { ref, inject, provide } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import UpdateCommunityRequestView from '@/views/Community/Settings/UpdateCommunityRequestView.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import { useRouter } from 'vue-router';
import communityApi from "@/services/API/community.api";
import { ACTION } from '@/Enums/Action';
const router = useRouter();
const communities = ref([]);
const handleAction = async (action: string, communityId: number) => {
    switch (action) {
        case ACTION.view:
            router.push({ name: 'communityDetails', params: { id: communityId} })
            // const communitiesDirectChilder =  await communityService.getCommunityDirectChildren(communityId)
            break;
        case ACTION.delete:
            console.log('delete pressed', communityId);
            break;
        default:
            break
    }
};
provide('triggerAction', handleAction);
async function showAllCommunities() {
    try {
        const response = await communityApi.getUserCommunities()
        console.log('here is the',response);
        console.log('data is', response.data.data);
        
        communities.value = response.data.data

    } catch (error) {
        console.log(error);

    }
}
showAllCommunities()

// provide('triggerAction', handleAction);

const pageTitle = ref('Your communites')
</script>

<template>
        <!-- Breadcrumb Start -->
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <!-- Breadcrumb End -->
        <div class="flex flex-col gap-10">
            <TableThree :communities="communities" />
        </div>
</template>
