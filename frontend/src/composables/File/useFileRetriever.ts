import { useAuthStore } from '@/stores/AuthStore';
import type { FileService } from '@/services/FileService';
/**
 * 
 * @param fileService 
 * @param fileId 
 * @returns proccessed file
 * This composable function is used to view a 
 */
export async function useFileRetriever(fileService: FileService, fileId: number): Promise<Blob> {
    const authStore = useAuthStore()
    // request to make a download request using the specified fileId
    const response = await fileService?.viewFile(fileId)
    console.log('file accsed');
    
    // Get the user encryption keys from the store
    const userEncryptionKeys = authStore.getEncryptionKeys();
    // Get the file encryption keys from the response headers and convert them to Uint8Array
    const fileKeys = {
        iv: fileService.cryptoService.convertB64toUnit8Array(response.headers['x-iv']),
        secretKey: fileService.cryptoService.convertB64toUnit8Array(response.headers['x-secret_key'])
    }
    // Convert the user encryption keys from Base64 to Uint8Array
    const userEncryptionKeysInUni8Array = {
        iv: fileService.cryptoService.convertB64toUnit8Array(userEncryptionKeys.IV),
        secretKey: fileService.cryptoService.convertB64toUnit8Array(userEncryptionKeys.secretKey)
    };
    return await fileService.proccessRetrievedFile(new Uint8Array(response.data), fileKeys, userEncryptionKeysInUni8Array)
}