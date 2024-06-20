import { defineStore } from 'pinia'
import { GUEST } from "@/Enums/guest"
import router from "@/router"
import authApi from "@/services/API/auth.api.ts"

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        user: null
    }),
    getters: {
        guest: (): boolean => {
            const storageItem = window.localStorage.getItem("guest");
            if (!storageItem) return false;
            return storageItem == GUEST.isGuest ? true : false;
        },
    },
    actions: {
        async loadAuthUser()  {
            try {
                const response = await authApi.getAuthUser();
                this.user = response.data;
                return response.data;
            } catch (error) {
                this.user = null;
            }
        },
        async logout(): Promise<void> {
            try {
                await authApi.logout();
                // localStorage.clear()
                this.setGuest(GUEST.isGuest)
                sessionStorage.clear()
                // this.setEncryptionKeys(null)
                router.replace({ name: 'login' })
            } catch (error) {
                console.log('error during logout', error)
            }
        },

        setGuest(value:string):  void {
            window.localStorage.setItem('guest', value)
        },

        setPasswordInSeesion(password) {
            window.sessionStorage.setItem('password', password)
        },
        // {iv: iv, secretkey: secretkey}
        setEncryptionKeys(encryptionKey) {
            window.sessionStorage.setItem('encryptionKeys', JSON.stringify(encryptionKey))
        },
        setKeyPair(keyPair:{privateKey: string, publicKey: string} ): void {
            window.sessionStorage.setItem('keyPair', JSON.stringify(keyPair))
        },
        getKeyPair(): {privateKey: string, publicKey: string} { 
            const keyPairString = window.sessionStorage.getItem('keyPair');
            return JSON.parse(keyPairString);
        },
        getEncryptionKeys(): {iv: string, secretKey: string} {
            const encryptionKeyString = window.sessionStorage.getItem('encryptionKeys');
            return JSON.parse(encryptionKeyString);
        }


    }

});