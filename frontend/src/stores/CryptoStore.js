import { defineStore } from 'pinia'
import { Buffer } from "buffer";
import { RSA } from "@/services/crypto/RSA";
import { ForgeCryptoProvider } from "@/services/crypto/ForgeCryptoProvider";
import { PasswrodKeyDerivation } from "@/services/crypto/KDF/PasswrodKeyDerivation";
import { KeyDerivation } from '@/services/crypto/KDF/KDF';
export const useCryptoStore = defineStore("cryptoStore", {
    actions: {
        /**
         * Derives a password from the user's email using Scrypt.
         * @param {string} password - User's original password.
         * @param {string} email - User's email address.
         * @returns {Uint8Array} Derived password key.
         */
        async derivePasswordFromEmail(keyDerivationProvider, password, email) {
            const passwordKeyDerivation = new PasswrodKeyDerivation(keyDerivationProvider)
            const derivedPassword = await passwordKeyDerivation.generateDerivedPasswordKey(password, email)
            return derivedPassword 
        },
        /**
         * 
         * @param {string} key 
         * @param {string} salt
         * @returns {Uint8Array} Derived key
         */
        async deriveKey(keyDerivationProvider, keyBuffer, salt) {  
            const keyDerivationObj = new KeyDerivation(keyDerivationProvider)
            const derivedKey = await keyDerivationObj.generateDerivedKey(keyBuffer, salt)
            return derivedKey

        }
,
        /**
         * Generates an RSA key pair using the Forge library.
         * @returns {[string, string]} Array containing private key and public key.
         */

        async generateRSAKeyPair() {
            const forge = new ForgeCryptoProvider()
            const rsa = new RSA(forge) // use forge libarary as a provider for generating RSA keys
            const { privateKey, publicKey } = await rsa.generateRSAKeys()
            return { privateKey, publicKey };
        }
        ,
        /**
         * 
         * @param {Uint8Array} binaryKey
         * @returns {string} Base64 encoded derived key
         */
        convertUnit8ArraytoB64(binaryKey) {
            return Buffer.from(binaryKey).toString('base64')
        },
        /**
         * 
         * @param {string} B64Key
         * @returns {Uint8Array} Binary derived key
         */
        convertB64toUnit8Array(B64Key) {
            return Buffer.from(B64Key, 'base64')
        }

    }


});