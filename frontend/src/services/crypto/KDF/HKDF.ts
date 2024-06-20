import { hkdfConfig } from "@/config/crypto";
export class HKDF implements Types.Kdf {
    /**
     * 
     * @param {string} password - User's original password.
     * @param {string} salt - Salt value.
     * @returns {Uint8Array} Derived password key.
     */
    async generateDerivedKey(keyBuffer:any, salt: any): Promise<Uint8Array> {
        const saltBuffer = new TextEncoder().encode(salt);
    
        const importedKey = await window.crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'HKDF' },
            false,
            ['deriveBits', 'deriveKey']
        );
    
        const derivedBits = await window.crypto.subtle.deriveBits(
            {
                name: 'HKDF',
                salt: saltBuffer,
                hash: hkdfConfig.hashAlgorithm,
                info: new Uint8Array(),
            },
            importedKey,
            hkdfConfig.keyLengthBits
        );
        return new Uint8Array(derivedBits);
    }

  
}