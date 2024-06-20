namespace Types {
    export interface Kdf {
        generateDerivedKey(key: any, salt: any): Promise<Uint8Array>;
    }
}