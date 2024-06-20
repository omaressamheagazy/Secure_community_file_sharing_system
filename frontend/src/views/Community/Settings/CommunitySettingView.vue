<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TabThree from '@/components/Tabs/TabThree.vue'
import UpdateCommunityView from '@/views/Community/UpdateCommunityView.vue';
import CommunityRequestListView from './CommunityRequestListView.vue';
const route = useRoute();

const tabs = [
  {
    title: 'General',
    component: UpdateCommunityView
  },
  {
    title: 'Members',
    component:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ex dolorum voluptate cupiditate adipisci doloremque, vel quam praesentium nihil veritatis.'
  },
  {
    title: 'Requests',
    component: CommunityRequestListView
  },
  {
    title: 'Notification',
    component:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod.'
  }
]
const pageTitle = ref('Community Settings')
</script>
<template>
  <!-- Breadcrumb Start -->
  <BreadcrumbDefault :pageTitle="pageTitle" parentName="Community Dashboard"
    :parentRoute="{ name: 'communityDetails', id: route.params.id }" />

  <!-- Breadcrumb End -->

  <!-- Dropdowns Start -->
  <div class="flex flex-col gap-9">
    <TabThree :tabs="tabs" :community-id="route.params.id" />
  </div>
  <!-- Dropdowns End -->
</template>