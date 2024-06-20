<script setup lang="ts">
import { ref, inject, toRaw } from 'vue';
import { CommunityServiceKey } from "@/symbols";
import { useAuthStore } from '@/stores/AuthStore';
import ModalOne from '@/components/Modals/ModalOne.vue'
import SelectGroupOne from '@/components/Forms/SelectGroup/SelectGroupOne.vue';
import SelectGroupThree from '@/components/Forms/SelectGroup/SelectGroupThree.vue';
import { STATUS } from '@/Enums/Action';
import { notify } from 'notiwind';

const communityService = inject(CommunityServiceKey);
const authStore = useAuthStore()
const userRole = ref<string>('')
const requestStatus = ref<string>(STATUS.pending)
const emit = defineEmits(['getSubCommunityData'])
const props = defineProps(['id', 'community_id', 'user'])

async function updateCommunityRequest() {
    try {
        let request = {
            status: requestStatus.value
        }
        const user = toRaw(props.user)
        if (requestStatus.value == STATUS.accept) {
            const adminPrivateKey = authStore.getKeyPair().privateKey
            const decrypteAdmindMemberShipKey = await communityService.fetchDecryptedMembershipKey(props.community_id, adminPrivateKey)
            const encryptednewMemberMembershipKey = await communityService.encryptMembershipKey(decrypteAdmindMemberShipKey, user.public_key)
            request['role'] = userRole.value
            request['user_id'] = user.id
            request['membership_key'] = JSON.stringify(encryptednewMemberMembershipKey)
        }
        const response = await communityService.updateCommunityRequest(props.community_id, props.id, request)
        console.log(response);
        if (response.status == 200) {
            notify({
            title: "Success",
            text: 'Request updated successfully',
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

</script>
<template>
    <ModalOne title="Update Request" modalName="View" buttonName="save" @submit="updateCommunityRequest">
        <form class="mb-7">
            <div class="mb-3">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                </label>
                <input type="text" :placeholder="user.name" disabled
                    class="w-full rounded-lg border-[1.5px] text-black font-extrabold border-stroke bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
            </div>
            <div class="mb-3">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                </label>
                <input type="text" :placeholder="user.email" disabled
                    class="w-full rounded-lg border-[1.5px] font-extrabold text-black border-stroke bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
            </div>
            <!-- Select input Start -->
            <div class="mb-3">
                <SelectGroupOne @getSelectedValue="(selectedValue) => requestStatus = selectedValue" />
                <!-- Select input End -->
            </div>
            <div v-if="requestStatus == STATUS.accept" class="mb-3">
                <SelectGroupThree @getSelectedValue="(selectedValue) => userRole = selectedValue" />
                <!-- Select input End -->
            </div>
        </form>
    </ModalOne>
</template>