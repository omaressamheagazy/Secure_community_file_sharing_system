<script setup lang="ts">
import { provide } from 'vue'
import BreadcrumbOne from '@/components/Breadcrumbs/BreadcrumbOne.vue'
import DownloadList from '@/components/DownloadList.vue'
import FileDetailsList from '@/components/FileDetailsList.vue'
import CommunityDropdown from '@/components/Community/CommunityDropdown.vue'
import { useCommunityStore } from '@/stores/CommunityStore'
import { useCommunityDetails } from '@/composables/useCommunityDetails'
import { useCommunityDropdownActions } from '@/composables/useCommunityDropdownActions'
import { useEntityViewActions } from '@/composables/useEntityViewActions'

// a shared store, to share all the common data between the components/composables
const communityStore = useCommunityStore()

const { handleEntityViewAction } = useEntityViewActions()
const { handleCommunityDropdownActions } = useCommunityDropdownActions()
useCommunityDetails();

provide('triggerCommunityAction', handleCommunityDropdownActions)


</script>

<template>
        <!-- <BreadcrumbDefault :pageTitle="communityStore.community.name" /> -->
        <div class="mb-5  flex items-center justify-between content-center	">
            <!-- Breadcrumb Start -->
            <BreadcrumbOne :breadcrumbItems="communityStore.breadcrumbItems" />
            <!-- Breadcrumb End -->
            <CommunityDropdown />

        </div>

        <FileDetailsList :totalFiles="communityStore.totalFiles" :totalCommunities="communityStore.totalCommunities" />
        <!-- File Details List End -->
        <div class=" mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            <!-- Download List Start -->
            <DownloadList :entities="communityStore.entites" @view="handleEntityViewAction" />
            <!-- Download List End -->
        </div>
</template>
