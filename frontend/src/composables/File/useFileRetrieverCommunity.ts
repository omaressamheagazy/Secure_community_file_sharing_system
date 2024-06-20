import { useAuthStore } from '@/stores/AuthStore';
import type { FileService } from '@/services/FileService';
/**
 * 
 * @param fileService 
 * @param fileId 
 * @returns proccessed file
 * This composable function is used to view a 
 */
export async function useFileRetrieverCommunity(fileService: FileService, privateKey:string, fileId: number): Promise<{ name: string, content: Blob }> {
    const authStore = useAuthStore()
    // request to make a download request using the specified fileId
    const response = await fileService?.viewFile(fileId)
    
    // get the file key
    console.log(response.headers['x-name']);
    
    const fileKeys = {
        iv: response.headers['x-iv'],
        secretKey: response.headers['x-secret_key']
    }
    console.log(fileKeys);
    
    return await fileService.proccessRetrievedFileCommunity(new Uint8Array(response.data), fileKeys, privateKey, response.headers['x-name'])
}