import { provide } from 'vue';
import { FileService } from '@/services/FileService';
import { AuthService } from '@/services/AuthService';
import { CryptoService } from '@/services/crypto/CryptoService';
import { CommunityService } from '@/services/CommunityService';

import { AESWithCBC } from '@/services/crypto/AES/AESWithCBC';
import { ScryptCryptoProvider } from "@/services/crypto/KDF/ScryptCryptoProvider";
import { PKDF2 } from "@/services/crypto/KDF/PKDF2";
import { HKDF } from "@/services/crypto/KDF/HKDF";
import { ForgeCryptoProvider } from '@/services/crypto/ForgeCryptoProvider';
// plugins/dependencyInjection.js
// import FileService from './services/FileService';
import { FileServiceKey } from '@/symbols';
import { AuthServiceKey } from '@/symbols';
import { CryptoServiceKey } from '@/symbols';
import { CommunityServiceKey } from '@/symbols';



export default {
  install: (app) => {
    // Create instances of the dependencies
    const cryptoService : CryptoService = new CryptoService(new AESWithCBC(), new ForgeCryptoProvider());
    const fileService: FileService = new FileService(cryptoService);
    const authService : AuthService = new AuthService(new ScryptCryptoProvider(), new PKDF2(), new HKDF(), cryptoService);
    const communityService : CommunityService = new CommunityService(cryptoService);
    // Provide the instances to the application
    app.provide(FileServiceKey, fileService);
    app.provide(AuthServiceKey, authService);
    app.provide(CryptoServiceKey, cryptoService);
    app.provide(CommunityServiceKey, communityService);
  }
}