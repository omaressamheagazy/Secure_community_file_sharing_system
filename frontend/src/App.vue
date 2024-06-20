<script setup lang="ts">
import { usePageTitleStore } from "@/stores/PageTitleStore"
import AppNotification from "@/components/Notifications/AppNotification.vue";
const titleStore = usePageTitleStore()


</script>

<template>
  <router-view></router-view>
  <NotificationGroup group="foo">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-9999">
      <div class="w-full max-w-sm">
        <AppNotification />
      </div>
    </div>
  </NotificationGroup>

</template>

<style scoped></style>
