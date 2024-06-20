<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import { CommunityServiceKey } from "@/symbols";
import { notify } from 'notiwind';
import { inject, ref } from 'vue';
let publicCommunities = ref([]);
const communityService = inject(CommunityServiceKey);
async function sendCommunityRequest(communityId: number) {
  try {
    const response = await communityService.sendCommunityRequest(communityId)
    if(response.status === 201){
      notify({
            title: "Success",
            text: response.data?.message,
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
async function showAllPublicCommunities() {
    try {
        const response = await communityService.getPublicCommunities()
        if(response.status === 200 && response.data?.data?.length > 0){
          publicCommunities.value = response.data.data
        }

    } catch (error) {
        console.log(error);

    }
}

showAllPublicCommunities()
</script>

<template>
    <h1 class="text-3xl font-bold mb-4">Public Communities</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne :publicCommunities="publicCommunities" @send-community-request="sendCommunityRequest" />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Chart One Start -->
      <!-- <ChartOne /> -->
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <!-- <ChartTwo /> -->
      <!-- ====== Chart Two End -->

      <!-- ====== Chart Three Start -->
      <!-- <ChartThree /> -->
      <!-- ====== Chart Three End -->

      <!-- ====== Map One Start -->
      <!-- <MapOne /> -->
      <!-- ====== Map One End -->

      <!-- ====== Table One Start -->
      <!-- <div class="col-span-12 xl:col-span-8">
        <TableOne />
      </div> -->
      <!-- ====== Table One End -->

      <!-- ====== Chat Card Start -->
      <!-- <ChatCard /> -->
      <!-- ====== Chat Card End -->
    </div>
</template>
