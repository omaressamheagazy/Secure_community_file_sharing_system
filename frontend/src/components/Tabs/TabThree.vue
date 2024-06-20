<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['tabs', 'communityId'])
const activeTab = ref(0)


const selectTab = (index: number) => {
  activeTab.value = index
}
</script>

<template>
  <div class="mb-14 w-full px-7.5">
    <div class="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
      <router-link to="" v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)" :class="{
        'text-primary border-primary': activeTab === index,
        'border-transparent': activeTab !== index
      }" class="border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base">
        {{ tab.title }}
      </router-link>
    </div>
    <div>
      <div class="font-medium leading-relaxed">
            <component :is="tabs[activeTab].component" :community-id="communityId"></component>
      </div>
    </div>
  </div>
</template>
