
import { useAuthStore } from '@/stores/AuthStore'

export async function useFileUploadCommunity(fileService,publicKey:string ,file: any) {
    const authStore = useAuthStore()
    const proccessedFile = await fileService.processUploadedFileCommunity(file, publicKey)
    return await fileService.uploadFile(proccessedFile)
}