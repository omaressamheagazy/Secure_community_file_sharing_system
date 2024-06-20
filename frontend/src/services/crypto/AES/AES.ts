export class AES implements Types.AES {
    constructor(AESProvider) {
        this.AESProvider = AESProvider;
    }
    /**
     * 
     * @param {ArrayBuffer} data 
     * @returns {Promise<ArrayBuffer>} - A promise containing the encrypted data in ArrayBuffer format.
     */
    encrypt(data) {
        return this.AESProvider.encrypt(data);
    }
    /**
     * 
     * @param {ArrayBuffer} data 
     * @returns {Promise<ArrayBuffer>} - A promise containing the decrypted data in ArrayBuffer format.
     */
    decrypt(encryptedData) {
        return this.AESProvider.decrypt(encryptedData);
    }


}