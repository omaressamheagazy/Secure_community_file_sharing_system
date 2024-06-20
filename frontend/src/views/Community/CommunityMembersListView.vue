<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DataTableTwo from '@/components/DataTables/DataTableTwo.vue'

import { ref } from 'vue'

const pageTitle = ref('Community Members')
</script>
<template>

    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
      <!-- ====== Data Table One Start -->
      <!-- ====== Data Table One End -->

      <!-- ====== Data Table Two Start -->
      <DataTableTwo />
      <!-- ====== Data Table Two End -->
    </div>

</template>