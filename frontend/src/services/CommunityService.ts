import communityApi from "@/services/API/community.api";
import type { AxiosResponse } from "axios";
import type { CryptoService } from "@/services/crypto/CryptoService";
import type { useThrottledRefHistory } from "@vueuse/core";

export class CommunityService {
    cryptoService: CryptoService;
    constructor(cryptoService: CryptoService) {
        this.cryptoService = cryptoService;
    }
    async getCommunityDirectChildren(id: number): Promise<AxiosResponse> {
        return await communityApi.getCommunityDirectChildren(id);
    }
    async getPublicCommunities(): Promise<AxiosResponse> {
        return await communityApi.getPublicCommunities();
    }
    async getCommunityKeys(id: number): Promise<AxiosResponse> {
        return await communityApi.getCommunityKeys(id);
    }
    async createCommunity(community: any): Promise<AxiosResponse> {
        return await communityApi.createCommunity(community);
    }
    async sendCommunityRequest(communityId: number): Promise<AxiosResponse> {
        return await communityApi.sendCommunityRequest(communityId);
    } 
    async getCommunityRequests(communityId: number): Promise<AxiosResponse> {
        return await communityApi.getCommunityRequests(communityId);
    }
    async encryptMembershipKey(membershipKeys: { secretKey: Uint8Array, iv: Uint8Array }, userPublicKey: string): Promise<{ secretKey: string, iv: string }> {
        const encryptedIv = await this.cryptoService.RSAProvider.encrypt(
            this.cryptoService.convertUnit8ArraytoB64(membershipKeys.iv),
            userPublicKey
        );
        console.log('encryptedIv', encryptedIv);

        const encryptedSecretKey = await this.cryptoService.RSAProvider.encrypt(
            this.cryptoService.convertUnit8ArraytoB64(membershipKeys.secretKey),
            userPublicKey
        );
        return { secretKey: encryptedIv, iv: encryptedSecretKey };
    }
    async decryptMembershipKey(encryptedMembershipKeys: { secretKey: string, iv: string }, userPrivateKey: string): Promise<{ secretKey: Uint8Array, iv: Uint8Array }> {
        const { secretKey, iv } = encryptedMembershipKeys
        const decryptedIv = await this.cryptoService.RSAProvider.decrypt(
            iv,
            userPrivateKey
        );
        const decryptedSecretKey = await this.cryptoService.RSAProvider.decrypt(
            secretKey,
            userPrivateKey
        );
        return { secretKey: this.cryptoService.convertB64toUnit8Array(decryptedIv), iv: this.cryptoService.convertB64toUnit8Array(decryptedSecretKey) };
    }
    async encryptCommunityPrivateKey(privateKey: string, membershipKeys: { secretKey: Uint8Array, iv: Uint8Array }): Promise<string> {
        const encryptedPrivateKeyBuffer = await this.cryptoService.AESencrypt(
            new TextEncoder().encode(privateKey),
            membershipKeys
        );
        return this.cryptoService.convertUnit8ArraytoB64(
            new Uint8Array(encryptedPrivateKeyBuffer)
        );
    }
    async decryptCommunityPrivateKey(encryptedPrivateKey: string, membershipKeys: { secretKey: Uint8Array, iv: Uint8Array }): Promise<string> {
        const decryptedPrivateKeyBuffer = await this.cryptoService.AESdecrypt(
            this.cryptoService.convertB64toUnit8Array(encryptedPrivateKey),
            membershipKeys
        );
        return new TextDecoder().decode(new Uint8Array(decryptedPrivateKeyBuffer));
    }
    generateCommunityMembershipKey(): { secretKey: Uint8Array, iv: Uint8Array } {
        return this.cryptoService.generateRandomAESKeys(16, 16);
    }
    async getCommmunityBasicInfo(id: number): Promise<AxiosResponse> {
        return await communityApi.getCommmunityBasicInfo(id);
    }
    async updateCommunityInfo(community): Promise<AxiosResponse> {
        return await communityApi.updateCommunityInfo(community.id, community);
    }
    async updateCommunityRequest(communityId: number, requestId: number, payload: any): Promise<AxiosResponse> {
        return await communityApi.updateCommunityRequest(communityId, requestId, payload);
    }
    async fetchDecryptedMembershipKey(rootCommunityId: number, decryptionKey: string): Promise<{ secretKey: Uint8Array, iv: Uint8Array }>{
        const memberResponse = await communityApi.getCommunityMember(rootCommunityId);
        console.log(rootCommunityId , 'id');
        
        const userEncryptedMembershipKey = memberResponse.data?.data?.membership_key;
        return await this.decryptMembershipKey(
            JSON.parse(userEncryptedMembershipKey), decryptionKey
        );
    }
}