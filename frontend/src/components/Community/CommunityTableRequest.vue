<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['requests'])
const emit = defineEmits(['updateCommunityRequest'])
import UpdateCommunityRequestView from '@/views/Community/Settings/UpdateCommunityRequestView.vue';

function handleView(id: number, user: any) {
  console.log('Viewing request', id, user)
}
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Name
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Request date
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in requests" :key="index">
            <td class="py-5 px-4 pl-9 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">{{ request.user.name }}</h5>
              <p class="text-sm">{{ request.user.email }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ request.created_at }}</p>
            </td>
            <td class="py-5 px-4">
              <p
                class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                :class="{
                  'bg-warning text-warning': request.status === 'pending',
                  'bg-danger text-danger': request.status === 'Unpaid',
                  'bg-success text-success': request.status === 'Paid'
                }"
              >
                {{ request.status }}
              </p>
            </td>
            <td class="py-5 px-4">
              <div class="col-span-1">
                <UpdateCommunityRequestView :id="request.id" :user="request.user" :community_id="request.community_id"/>
                <!-- <button @click="$emit('updateCommunityRequest',request.id, requests.user)" class="float-right text-primary">View</button> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
