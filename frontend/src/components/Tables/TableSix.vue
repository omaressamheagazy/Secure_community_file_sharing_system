<script setup lang="ts">
import { ref } from 'vue'
import DropdownFour from '@/components/Dropdowns/DropdownFour.vue'

const props = defineProps(['files'])


</script>

<template>
  <div class="max-w-full overflow-x-auto">
    <div class="min-w-[1170px]">
      <!-- table header start -->
      <div class="grid grid-cols-12 rounded-t-[10px] bg-primary px-5 py-4 lg:px-7.5 2xl:px-11">
        <div class="col-span-3">
          <h5 class="font-medium text-white">Name</h5>
        </div>

        <div class="col-span-3">
          <h5 class="font-medium text-white">size</h5>
        </div>

        <div class="col-span-3">
          <h5 class="font-medium text-white">crated at</h5>
        </div>

        <div class="col-span-2">
          <h5 class="font-medium text-white">updated at</h5>
        </div>

        <div class="col-span-1">
          <h5 class="text-right font-medium text-white">Edit</h5>
        </div>
      </div>
      <!-- table header end -->

      <!-- table body start -->
      <div class="bg-white dark:bg-boxdark rounded-b-[10px]">
        <template v-for="(file, index) in props.files" :key="index">
          <div
            class="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
          >
            <div class="col-span-3">
              <p class="text-[#637381] dark:text-bodydark">{{ file.name }}</p>
            </div>

            <div class="col-span-3">
              <p class="text-[#637381] dark:text-bodydark">{{ file.size }}</p>
            </div>

            <div class="col-span-3">
              <p class="text-[#637381] dark:text-bodydark">{{ file.created_at }}</p>
            </div>

            <div class="col-span-2">
              <p class="text-[#637381] dark:text-bodydark">{{ file.updated_at }}</p>
            </div>

            <div class="col-span-1">
              <DropdownFour :id="file.id" />
            </div>
          </div>
        </template>
      </div>
      <!-- table body end -->
    </div>
  </div>
</template>
