<script setup lang="ts">

import { ref, inject } from 'vue'

import router from "@/router/index";
import { GUEST } from "@/Enums/guest.js"
import Guest from "@/layouts/Guest.vue";
import { useAuthStore } from '@/stores/AuthStore.ts';
import authApi from '@/services/API/auth.api.ts'
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
// import { cryptoService } from '@/services/crypto/CryptoService.ts';
import AlertError from '@/components/Alerts/AlertError.vue';
import { AuthServiceKey } from '@/symbols';
import { CryptoServiceKey } from "@/symbols";

const cryptoService = inject(CryptoServiceKey);

const pageTitle = ref('Sign In')
const authService = inject(AuthServiceKey)
const authStore = useAuthStore();
let originalPassword: string // hold the orignial password temporary, to prevent the password to be ecnrypted multiple times when user re-click the button
let showError = ref(false)
let errorMsg


let user: { email: any, password: any, remember: any } = {
  email: '',
  password: '',
  remember: false
}
async function login() {
  try {
    
    originalPassword = user.password
    // generate a pre derived password key from the user email
    const derivedPassword = await authService.derivePasswordKeyFromEmail(user.password, user.email)
    // convert the derived password to base64, and assign it to the user password
    user.password = cryptoService.convertUnit8ArraytoB64(derivedPassword); 
    // attpemt to login with the user credentials
    await authApi.login(user)
    // load the user auth info
    const authUser = await authStore.loadAuthUser()
    if (authUser) {
      authStore.setGuest(GUEST.isNotGuest)
      console.log(authUser);
      
      // derive the encryption keys from the user info
      const { secretKey, iv } = await authService.deriveEncryptionKeysFromUserInfo(originalPassword, user.email)
      // decrypt the private key using user keys
      const encryptedPrivateKeyUnit8array = cryptoService.convertB64toUnit8Array(authUser.private_key)
      const decryptedPrivateKey = await cryptoService.AESdecrypt(encryptedPrivateKeyUnit8array, { secretKey, iv })
      const privateKeyPEM = new TextDecoder().decode(decryptedPrivateKey)
      // convert the encryption keys to base64
      const encryptionKeys = {
        secretKey: cryptoService.convertUnit8ArraytoB64(secretKey),
        IV: cryptoService.convertUnit8ArraytoB64(iv)
      }
      authStore.setEncryptionKeys(encryptionKeys)
      // set the key pair
      authStore.setKeyPair({ publicKey: authUser.public_key, privateKey: privateKeyPEM })
       //trial of decrypting the private key | should be removed
    /**
     * 
     const privateKeyUnit8Array = cryptoService.convertB64toUnit8Array(user.private_key)
     const decryptedPrivateKey = await cryptoService.AESdecrypt(privateKeyUnit8Array, userEncryptionKeys)
     const plaintextPrivateKey = new TextDecoder().decode(decryptedPrivateKey)
     console.log(plaintextPrivateKey);
     */
    
      router.replace({ name: 'eCommerce' })
    }
    else
      throw new Error()
  }
  catch (error) {
    console.log('originalPassword', originalPassword);
    user.password = originalPassword
    showError.value = true
    console.log('after error', user.password);
    if (error.response && error.response.status == 422) errorMsg = "Please Check again you email or password"

    console.log(showError.value);

    console.log(error)

  }
}
</script>

<template>
  <Guest>

    <DefaultAuthCard title="Sign In ">
      <AlertError v-if="showError" :title="errorMsg"></AlertError>
      <br>
      <form @submit.prevent="login" method="POST">
        <InputGroup v-model="user.email" label="Email" type="email" placeholder="Enter your email">
          <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                fill="" />
            </g>
          </svg>
        </InputGroup>

        <InputGroup v-model="user.password" label="Password" type="password" placeholder="8+ Characters">
          <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                fill="" />
              <path
                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                fill="" />
            </g>
          </svg>
        </InputGroup>

        <div class="mb-5 mt-6">
          <input type="submit" value="Sign In"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90" />
        </div>



        <div class="mt-6 text-center">
          <p class="font-medium">
            Don’t have any account?
            <router-link :to="{ name: 'register' }" class="text-primary">Sign up</router-link>
          </p>
        </div>
      </form>
    </DefaultAuthCard>
  </Guest>
</template>
