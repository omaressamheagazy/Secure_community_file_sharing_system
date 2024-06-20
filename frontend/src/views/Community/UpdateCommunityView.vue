<script setup lang="ts">
import { ref, inject, toRaw } from 'vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import { CommunityServiceKey } from "@/symbols";
import CommunityForm from '@/components/Community/CommunityForm.vue'
import { notify } from 'notiwind';
const props = defineProps(['communityId'])

const communityService = inject(CommunityServiceKey);
const pageTitle = ref('Update Community')
const community = ref({
    id: null,
    name: '',
    description: '',
})
async function updateCommunity() {
    const updatedCommunity = toRaw(community.value)
    try {

        const response = await communityService.updateCommunityInfo(updatedCommunity)
        if (response.status === 200 && response.data?.data) {
            notify({
                title: "Success",
                text: "Community updated successfully",
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
}

async function getCommunity(id: number) {
    try {

        const response = await communityService.getCommmunityBasicInfo(id)
        community.value = response.data.data
        console.log(community.value);


    } catch (error) {
        notify({
            title: "Error",
            text: error.response.data?.message ?? 'Unexpected error occured',
            type: "error",
            group: "app",
        }, 4000)
    }
}
getCommunity(props.communityId)
</script>
<template>
    <!-- Community FormStart -->
    <DefaultCard cardTitle="Community Form">
        <CommunityForm buttonName="Update" :community="community" @submitForm="updateCommunity" />
    </DefaultCard>
    <!-- Community FormEnd -->
</template>
