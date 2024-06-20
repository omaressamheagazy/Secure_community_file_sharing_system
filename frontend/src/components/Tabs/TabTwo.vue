<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = ref([
  {
    title: 'Home',
    content:
      'Lorem ipsum dolor sit amet, '
  },
  {
    title: 'About Us',
    content:
      'Lorem ipsum dolor sit amet,.'
  },

])

const selectTab = (index: number) => {
  activeTab.value = index
}
</script>

<template>
  <div class="mb-14 w-full p-7.5">
    <div class="mb-7.5 flex flex-wrap gap-3 border-b border-stroke pb-5 dark:border-strokedark">
      <router-link
        to=""
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{
          'bg-primary text-white': activeTab === index,
          'bg-gray dark:bg-meta-4 text-black dark:text-white': activeTab !== index
        }"
        class="rounded-md py-3 px-4 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6"
      >
        {{ tab.title }}
      </router-link>
    </div>
    <div>
      <div class="font-medium leading-relaxed">
        {{ tabs[activeTab].content }}
      </div>
    </div>
  </div>
</template>
