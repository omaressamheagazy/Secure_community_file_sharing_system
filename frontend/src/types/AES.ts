namespace Types {
    export interface AES {
        getRandomKeyValue(ketLength: number): Uint8Array;
        encrypt(data: Uint8Array): Promise<ArrayBuffer>;
        decrypt(encryptedData: Uint8Array): Promise<ArrayBuffer>;
        setKeys(keys : { secretKey: Uint8Array, iv: Uint8Array }) : void;
    }
}