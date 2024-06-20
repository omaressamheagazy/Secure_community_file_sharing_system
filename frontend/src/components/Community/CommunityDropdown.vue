<script setup lang="ts">
import { inject } from 'vue';
import DropdownOne from '@/components/Dropdowns/DropdownOne.vue';
import UploadFileModel from '@/components/File/UploadFileModel.vue'
import CreateSubCommunityModal from '@/components/Community/CreateSubCommunityModal.vue'
import { COMMUNITY_ACTION } from '@/Enums/Action';
const triggerCommunityAction = inject('triggerCommunityAction');
function handleCreateSbuCommunity(data) {
    triggerCommunityAction(COMMUNITY_ACTION.createSubCommunity, data);
}
function handleUploadFile(data) {
    triggerCommunityAction(COMMUNITY_ACTION.uploadFile, data);
}

function handleCommunityEdit() {
    triggerCommunityAction(COMMUNITY_ACTION.edit);
}

</script>
<template>
    <DropdownOne title="Community Actions">
        <template #element1>
            <CreateSubCommunityModal @getSubCommunityData="handleCreateSbuCommunity" />
        </template>
        <template #element2>
            <UploadFileModel @getFileData="handleUploadFile" />
        </template>
        <template #element3>
            <div @click="handleCommunityEdit"  class="flex py-2  cursor-pointer px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                Edit
            </div>
        </template>

    </DropdownOne>
</template>