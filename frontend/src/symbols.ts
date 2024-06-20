import type { InjectionKey } from 'vue';
import type {  FileService } from '@/services/FileService';
import type { AuthService } from '@/services/AuthService';
import type { CryptoService } from '@/services/crypto/CryptoService';
import type { CommunityService } from '@/services/CommunityService'
export const FileServiceKey: InjectionKey<FileService> = Symbol('File');
export const AuthServiceKey: InjectionKey<AuthService> = Symbol('Auth');
export const CryptoServiceKey: InjectionKey<CryptoService> = Symbol('Crypto');
export const CommunityServiceKey: InjectionKey<CommunityService> = Symbol('Community');