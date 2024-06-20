
import { useAuthStore } from '@/stores/AuthStore'

export async function useFileUpload(fileService, file: any) {
    const authStore = useAuthStore()
    // Get the user encryption keys from the store
    const userEncryptionKeys = authStore.getEncryptionKeys();
    console.log('user encryptin keys', userEncryptionKeys);
    // Convert the user encryption keys from Base64 to Uint8Array
    const userEncryptionKeysInUni8Array = {
        iv: fileService.cryptoService.convertB64toUnit8Array(userEncryptionKeys.IV),
        secretKey: fileService.cryptoService.convertB64toUnit8Array(userEncryptionKeys.secretKey)
    };
    const proccessedFile = await fileService.processUploadedFile(file, userEncryptionKeysInUni8Array)
    return await fileService.uploadFile(proccessedFile)
}