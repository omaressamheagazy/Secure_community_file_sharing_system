// cryptoService.js
import { Buffer } from "buffer";


export class CryptoService  {
    AESProvider: Types.AES;
    RSAProvider: Types.RSA;
    constructor(AESProvider: Types.AES, RSAProvider: Types.RSA) {
        this.AESProvider = AESProvider;
        this.RSAProvider = RSAProvider;
    }
    async deriveKey(keyDerivationProvider: Types.Kdf  , password: any, email: any) : Promise<Uint8Array> {
        return await keyDerivationProvider.generateDerivedKey(password, email);
    }
    async AESencrypt(data:Uint8Array, keys:{secretKey:Uint8Array, iv:Uint8Array}): Promise<ArrayBuffer>  {
        this.AESProvider.setKeys(keys)
        return await this.AESProvider.encrypt(data)
    }
    async AESdecrypt(encryptedData:Uint8Array, keys:{secretKey:Uint8Array, iv:Uint8Array}): Promise<ArrayBuffer> {
        this.AESProvider.setKeys(keys)
        return await this.AESProvider.decrypt(encryptedData)
    }
    async RSAencrypt(data:string, publicKey:string): Promise<string> { 
        return await this.RSAProvider.encrypt(data, publicKey)
    }
    async RSAdecrypt(encryptedData:string, privateKey:string): Promise<string> {
        return await this.RSAProvider.decrypt(encryptedData, privateKey)
    }
    async generateRSAKeyPair() : Promise<{ privateKey: string, publicKey: string }>{
        const { privateKey, publicKey } = await this.RSAProvider.generateRSAKeys();
        return { privateKey, publicKey };
    }
    generateRandomAESKeys(secretKeyLen:number, ivLen:number) : {secretKey:Uint8Array, iv:Uint8Array} {
        return  {secretKey: this.AESProvider.getRandomKeyValue(secretKeyLen), iv: this.AESProvider.getRandomKeyValue(ivLen)}
    }
    /**
     * 
     * @param {Uint8Array} binaryKey
     * @returns {string} Base64 encoded derived key
     */
    convertUnit8ArraytoB64(binaryKey:Uint8Array) {
        return Buffer.from(binaryKey).toString('base64')
    }
    convertArrayBufferToB64(data:ArrayBuffer): string {
        return Buffer.from(data).toString('base64')
    }
    /**
     * 
     * @param {string} B64Key
     * @returns {Uint8Array} Binary derived key
     */
    convertB64toUnit8Array(B64Key: string): Uint8Array {
        return Buffer.from(B64Key, 'base64')
    }
    convertB64toArrayBuffer(B64Data: string): ArrayBuffer {
        return Buffer.from(B64Data, 'base64')
    }
};