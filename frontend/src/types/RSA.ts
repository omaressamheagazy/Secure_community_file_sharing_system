namespace Types {
    export interface RSA {
        generateRSAKeys(): Promise<{ privateKey: string, publicKey: string }>;
        encrypt(data: string, publicKey: string): Promise<string>;
        decrypt(data: string, privateKey: string): Promise<string>;
    }
}