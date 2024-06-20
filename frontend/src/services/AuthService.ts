import type { CryptoService } from "@/services/crypto/CryptoService";


export class AuthService  {
    private scryptProvider: Types.Kdf;
    private pkdf2Provider: Types.Kdf;
    private hkdfProvider: Types.Kdf;
    private cryptoService: CryptoService;
    constructor(scryptProvider: Types.Kdf, pkdf2Provider: Types.Kdf, hkdfProvider: Types.Kdf, cryptoService: any) {
        this.scryptProvider = scryptProvider;
        this.pkdf2Provider = pkdf2Provider;
        this.hkdfProvider = hkdfProvider;
        this.cryptoService = cryptoService;
      }
    async derivePasswordKeyFromEmail(password:string, email:string) : Promise<Uint8Array> {
        // Generate the pre-derived password
        return await this.cryptoService.deriveKey(
          this.scryptProvider,
          password,
          email
        );
    } 
    async encryptUserKeys(data:Uint8Array,keys: Uint8Array[]): Promise<ArrayBuffer> {
        return await this.cryptoService.AESencrypt(data, keys)
    }
    async deriveEncryptionKeysFromUserInfo(password:string, email:string): Promise<{secretKey: Uint8Array, iv: Uint8Array}>{
        const secretKey = await this.cryptoService.deriveKey(this.pkdf2Provider, password, email)
        const iv = await this.cryptoService.deriveKey(this.hkdfProvider, secretKey, email)
        return {secretKey: secretKey, iv: iv}
    }
 }