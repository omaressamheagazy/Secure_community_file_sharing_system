<script setup lang="ts">
import { ref, inject } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import { CommunityServiceKey } from "@/symbols";
import CommunityForm from '@/components/Community/CommunityForm.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { notify } from 'notiwind';

const authStore = useAuthStore()
const communityService = inject(CommunityServiceKey);
const pageTitle = ref('Community creation')
let community = {
    name: '',
    description: '',
    public_key: '',
    private_key: '',
    membership_key: null,
    user_id: '',
    parent_id: null,

}
async function crateCommunity() {
    console.log('hi');
    
    // generate the public and private keys for the community
    const communityKeyPairs = await communityService.cryptoService.generateRSAKeyPair()
    // get the user public key from the session storage
    const userPublicKey = authStore.getKeyPair().publicKey
    // generate the membership keys(IV + secretKey)
    const membershipKeys = communityService.generateCommunityMembershipKey()
    // encrypt the membership key using the user's public key 
    const encryptedMembershipKeys = await communityService.encryptMembershipKey(membershipKeys, userPublicKey)
    //encrypt the community private key using membership key
    const encryptedCommunityPrivateKey = await communityService?.encryptCommunityPrivateKey(communityKeyPairs.privateKey, membershipKeys)


    // save the community
    community.public_key = communityKeyPairs.publicKey
    community.private_key = encryptedCommunityPrivateKey
    community.membership_key = JSON.stringify(encryptedMembershipKeys)
    const createdCommunity = await communityService?.createCommunity(community)
    if (createdCommunity) {
        notify({
            title: "Success",
            text: "Community created successfully",
            type: "success",
            group: "app",
        }, 4000)
    }
    console.log(createdCommunity);
    //trial 
    /**
     * decrypt the community private key using the membership key
     const decyprtedPrivateKey = await communityService?.decryptCommunityPrivateKey(encryptedCommunityPrivateKey, membershipKeys)
     console.log('decyprtedPrivateKey', decyprtedPrivateKey);
     */

    /**
     * decrypt the membership key using the user's private key
     const userPrivateKey = authStore.getKeyPair().privateKey
     const decryptedMembershipKeys = await communityService.decryptMembershipKey(encryptedMembershipKeys, userPrivateKey)
     console.log('decrypted membership  key', decryptedMembershipKeys);
     */
}
</script>
<template>
        <!-- Breadcrumb Start -->
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <!-- Community FormStart -->
        <DefaultCard cardTitle="Community Form">
            <CommunityForm buttonName="Create" :community="community" @submitForm="crateCommunity" />
        </DefaultCard>
        <!-- Community FormEnd -->

</template>
