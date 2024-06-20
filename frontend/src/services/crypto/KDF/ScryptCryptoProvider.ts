import { scrypt } from 'scrypt-js';
import { Buffer } from "buffer";
import { scryptConfig } from '@/config/crypto';
export class ScryptCryptoProvider implements Types.Kdf{
    /**
     * Generates a derived password key using the Scrypt algorithm.
     * @param {string} password - User's original password.
     * @param {string} salt - Salt value.
     * @returns {Uint8Array} Derived password key.
     */
    async generateDerivedKey(password:any, salt:any) : Promise<Uint8Array> {
        const uPassword = Buffer.from(password.normalize('NFKC'));
        const uSalt = Buffer.from(salt.normalize('NFKC'));
        // Async
        return scrypt(uPassword, uSalt, scryptConfig.N, scryptConfig.r, scryptConfig.p, scryptConfig.dkLen);
    }
 
}
