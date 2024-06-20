export class AESWithCBC implements Types.AES {
    static KEY_LENGTH_IN_BYTES = 16; // 128-bit key
    static IV_LENGTH_IN_BYTES = 16; // 128-bit IV
    static ALGORITHM = 'AES-CBC';
    secretRawKey : Uint8Array;
    IV : Uint8Array ;
    constructor(secretRawKey?:Uint8Array, IV?:Uint8Array) {
        if (typeof secretRawKey === "undefined") this.secretRawKey = crypto.getRandomValues(new Uint8Array(AESWithCBC.KEY_LENGTH_IN_BYTES));
        else this.secretRawKey = secretRawKey; 
        if (typeof IV === "undefined") this.IV = crypto.getRandomValues(new Uint8Array(AESWithCBC.IV_LENGTH_IN_BYTES));
        else this.IV = IV; 
    }
    setKeys(keys: {secretKey:Uint8Array, iv:Uint8Array}): void {
        console.log('keys from AES', keys);
        
        this.secretRawKey = keys.secretKey;
        this.IV = keys.iv;

     }
    getRandomKeyValue(ketLength:number) : Uint8Array {
        return crypto.getRandomValues(new Uint8Array(ketLength));
    }
    /**
     * 
     * @param {Uint8Array} rawKey
     * @returns a promise contains the cryptoKey in the format of ArrayBuffer
     */

    static async getCryptoKeyFromRawSecretKey(rawKey:Uint8Array) : Promise<CryptoKey> {
        return await crypto.subtle.importKey(
            'raw',
            rawKey,
            { name: AESWithCBC.ALGORITHM },
            true,
            ['encrypt', 'decrypt']
        );
    }
    /**
     * 
     * @returns  a promise contains the encrypted data in ArrayBuffer format
     */
    async encrypt(data:Uint8Array): Promise<ArrayBuffer> {
        const cryptoKey = await AESWithCBC.getCryptoKeyFromRawSecretKey(this.secretRawKey);

        const encryptedData = await crypto.subtle.encrypt(
            { name: AESWithCBC.ALGORITHM, iv: this.IV },
            cryptoKey,
            data
        );
        return encryptedData
    }
    /**
     * 
     * @returns a promise contains the decrypted data in ArrayBuffer format
     */
    async decrypt(encryptedData:Uint8Array) : Promise<ArrayBuffer> {
        const cryptoKey = await AESWithCBC.getCryptoKeyFromRawSecretKey(this.secretRawKey);

        const decryptedData = await crypto.subtle.decrypt(
            { name: AESWithCBC.ALGORITHM, iv: this.IV },
            cryptoKey,
            encryptedData
        );
        return decryptedData;
    }
}