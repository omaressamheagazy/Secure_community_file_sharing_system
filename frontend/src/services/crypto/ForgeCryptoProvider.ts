import forge from 'node-forge';
import { rsaConfig } from '@/config/crypto';
/**
 * RSA.generatRSAkeys(2048, 65553)
 */
export class ForgeCryptoProvider implements Types.RSA {
    privateKey: string | null;
    publicKey: string | null;
    constructor() {
        this.privateKey = null; // Initialize to null or generate during instantiation
        this.publicKey = null; // Initialize to null or generate during instantiation
    }
    /**
     * Generates a new RSA key pair asynchronously.
     *
     * @returns {Promise<{ publicKey: string, privateKey: string }>} - A Promise that resolves to an object containing the public and private keys in PEM format.
     */
    async generateRSAKeys(): Promise<{ privateKey: string, publicKey: string }> {
        return new Promise((resolve, reject) => {
            forge.pki.rsa.generateKeyPair({ bits: rsaConfig.keySize, workers: 2 }, (err, keypair) => {
                if (err) {
                    reject(err);
                } else {
                    this.privateKey = forge.pki.privateKeyToPem(keypair.privateKey)
                    this.publicKey = forge.pki.publicKeyToPem(keypair.publicKey)
                    resolve({
                        privateKey: this.privateKey,
                        publicKey: this.publicKey,
                    });
                }
            });
        });
    }
    /**
     * 
     * @param data 
     * @param publicKey - PEM formatted public key
     * @returns base64 encoded encrypted data
     */
    async encrypt(data: string, publicKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const key = forge.pki.publicKeyFromPem(publicKey);
                const encrypted = key.encrypt(data, 'RSA-OAEP', {
                    md: forge.md.sha256.create(),
                    mgf1: forge.mgf1.create(),
                });
                const base64Encrypted = forge.util.encode64(encrypted);
                resolve(base64Encrypted);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * 
     * @param encryptedData 
     * @param privateKey - PEM formatted private key
     */
    async decrypt(encryptedData: string, privateKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const key = forge.pki.privateKeyFromPem(privateKey);
                const decoded = forge.util.decode64(encryptedData);
                const decrypted = key.decrypt(decoded, 'RSA-OAEP', {
                    md: forge.md.sha256.create(),
                    mgf1: forge.mgf1.create(),
                });
                resolve(decrypted);
            } catch (error) {
                reject(error);
            }
        });
    }

}