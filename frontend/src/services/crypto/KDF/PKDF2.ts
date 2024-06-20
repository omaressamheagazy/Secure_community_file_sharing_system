import { pbkdf2Config } from '@/config/crypto.js';
export class PKDF2 implements Types.Kdf{
    /**
     * Generates a derived password key using the PBKDF2 algorithm.
     * @param {string} password - User's original password.
     * @param {string} salt - Salt value.
     * @returns {Uint8Array} Derived password key.
     */
    async generateDerivedKey(password:any, salt:any): Promise<Uint8Array>{
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const saltBuffer = encoder.encode(salt);

        const importedKey = await window.crypto.subtle.importKey(
            'raw',
            passwordBuffer, 
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        const derivedBits = await window.crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: pbkdf2Config.iterations,
                hash: pbkdf2Config.hashAlgorithm,
            },
            importedKey,
            pbkdf2Config.keyLengthBits
        );

        return new Uint8Array(derivedBits);
    }
}