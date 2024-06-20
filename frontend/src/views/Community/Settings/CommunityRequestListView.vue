<script setup lang="ts">
import { ref, watch, inject, provide } from 'vue'
import { useRoute } from 'vue-router';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CommunityTableRequest from '@/components/Community/CommunityTableRequest.vue'
import UpdateCommunityRequestView from './UpdateCommunityRequestView.vue';
import { notify } from "notiwind"

// Error notification
// Error notification


import { CommunityServiceKey } from "@/symbols";
const communityService = inject(CommunityServiceKey);
const route = useRoute();
const pageTitle = ref('Community Requests')
const communityRequests = ref([]);
async function fetchCommunityRequest(communityId: number) {
  try {
    const respose = await communityService?.getCommunityRequests(communityId)
    if (respose?.data?.data.length > 0) {
      communityRequests.value = respose.data.data
    } else {
      notify({
        title: "Info",
        text: "No pending requests found!",
        type: "info",
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
fetchCommunityRequest(route.params.id);
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchCommunityRequest(Number(newId));
  }
});
</script>

<template>
  <!-- Breadcrumb Start -->
  <!-- Breadcrumb End -->

  <div class="flex flex-col gap-10">
    <!-- <UpdateCommunityRequestView /> -->
    <CommunityTableRequest :requests="communityRequests" />
  </div>
</template>
