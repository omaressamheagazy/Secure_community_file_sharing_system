import fileApi from "@/services/API/file.api";
import type { AxiosResponse } from "axios";
import type { CryptoService } from "@/services/crypto/CryptoService";

export class FileService {
    cryptoService: CryptoService;
    constructor(cryptoService: CryptoService) {
        this.cryptoService = cryptoService;
    }
    async encryptFileContent(fileContentBuffer: Uint8Array, keys: { secretKey: Uint8Array, iv: Uint8Array }) {
        return await this.cryptoService.AESencrypt(fileContentBuffer, keys)
    }
    async decryptFile(ecnryptedfileContentBuffer: Uint8Array, keys: { iv: Uint8Array, secretKey: Uint8Array }): Promise<ArrayBuffer> {
        return await this.cryptoService.AESdecrypt(ecnryptedfileContentBuffer, keys)
    }
    /**
     * generates the file secretKey and IV, and encrypted these key using user's keys
     * 
     * extract the content of the the file and encrypt it using the generated secretKey and IV
     * 
     * construct the file again using the encrypted file content and encrypted file's keys, and reutrn it
     */
    async processUploadedFile(file: File, userEncryptionKeys: { iv: Uint8Array, secretKey: Uint8Array }): Promise<any> {
        const fileKeys = this.generateFileSecretKeys();
        console.log('file keys', fileKeys);

        const encryptedFileSecretKey = await this.cryptoService.AESencrypt(fileKeys.secretKey, userEncryptionKeys);
        const encryptedFileIvKey = await this.cryptoService.AESencrypt(fileKeys.iv, userEncryptionKeys);
        const fileContentBuffer = await this.getFileContentAsBuffer(file);
        const encryptedFileBuffer = await this.encryptFileContent(fileContentBuffer, fileKeys);
        return {
            name: file.name,
            size: file.size,
            mime: file.type,
            // the parent_id is the id of the parent folder, and it can be empty if the file is uploaded in the personla space
            parent_id: file.parent_id ?? '',
            secreteKey: this.cryptoService.convertUnit8ArraytoB64(new Uint8Array(encryptedFileSecretKey)),
            iv: this.cryptoService.convertUnit8ArraytoB64(new Uint8Array(encryptedFileIvKey)),
            content: new Blob([encryptedFileBuffer], { type: 'application/octet-stream' })
        }
    }
    async processUploadedFileCommunity(file: File, communityPublicKey: string): Promise<any> {
        const fileKeys = this.generateFileSecretKeys();
        const ivB64 = this.cryptoService.convertUnit8ArraytoB64(fileKeys.iv);
        const secretKeyB64 = this.cryptoService.convertUnit8ArraytoB64(fileKeys.secretKey);
        console.log('file keys', fileKeys);

        const encryptedFileSecretKey = await this.cryptoService.RSAencrypt(secretKeyB64, communityPublicKey);
        const encryptedFileIvKey = await this.cryptoService.RSAencrypt(ivB64, communityPublicKey);
        const fileContentBuffer = await this.getFileContentAsBuffer(file);
        const encryptedFileBuffer = await this.encryptFileContent(fileContentBuffer, fileKeys);
        return {
            name: file.name,
            size: file.size,
            mime: file.type,
            // the parent_id is the id of the parent folder, and it can be empty if the file is uploaded in the personla space
            parent_id: file.parent_id ?? '',
            secreteKey: encryptedFileSecretKey,
            iv: encryptedFileIvKey,
            content: new Blob([encryptedFileBuffer], { type: 'application/octet-stream' })
        }
    }
    /**
     * 
     * decrypt the fileKey and fileIv using the user encryption keys
     * 
     * convert the decrypted the file key, and file iv from arrayBuffer to unit8Array
     * 
     * pass the decrypted file iv and file key to the decrypt function to decrypt the file content
     */
    async proccessRetrievedFile(file: Uint8Array, fileKeys: { iv: Uint8Array, secretKey: Uint8Array }, userEncryptionKeys: { iv: Uint8Array, secretKey: Uint8Array }): Promise<Blob> {
        const decryptedIv = new Uint8Array(await this.cryptoService.AESdecrypt(fileKeys.iv, userEncryptionKeys))
        const decryptedSecretKey = new Uint8Array(await this.cryptoService.AESdecrypt(fileKeys.secretKey, userEncryptionKeys))
        const decryptedFile = await this.decryptFile(file, { iv: decryptedIv, secretKey: decryptedSecretKey });
        return new Blob([decryptedFile]);

    }
    async proccessRetrievedFileCommunity(file: Uint8Array, fileKeys: { iv: string, secretKey: string }, privateKey: string, fileName:string): Promise<{ name: string, content: Blob }>{
        const decryptedIv = await this.cryptoService.RSAdecrypt(fileKeys.iv, privateKey)
        const decryptedSecretKey = await this.cryptoService.RSAdecrypt(fileKeys.secretKey, privateKey)

        const decryptedFile = await this.decryptFile(file, { iv: this.cryptoService.convertB64toUnit8Array(decryptedIv), secretKey: this.cryptoService.convertB64toUnit8Array(decryptedSecretKey) });
        return  {
            name: fileName,
            content: new Blob([decryptedFile]),
        }

    }
    downloadFile(file: { name: string, content: Blob }): void {
        const url = window.URL.createObjectURL(file.content);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }
    generateFileSecretKeys(): { secretKey: Uint8Array, iv: Uint8Array } {
        return {
            secretKey: this.cryptoService.AESProvider.getRandomKeyValue(16),
            iv: this.cryptoService.AESProvider.getRandomKeyValue(16)
        }
    }
    async encryptFileKeys(fileSecretKey: Uint8Array, fileIv: Uint8Array, userEncryptionKeys: { iv: Uint8Array, secretKey: Uint8Array }) {
        const encryptedFileSecretKey = await this.cryptoService.AESencrypt(fileSecretKey, userEncryptionKeys);
        const encryptedFileIvKey = await this.cryptoService.AESencrypt(fileIv, userEncryptionKeys);
        return {
            secretKey: new Uint8Array(encryptedFileSecretKey),
            iv: new Uint8Array(encryptedFileIvKey)
        };
    }
    convertUnit8ArrayToB64(secretKey: Uint8Array, iv: Uint8Array): { secretKey: string, iv: string } {
        return {
            secretKey: this.cryptoService.convertUnit8ArraytoB64(secretKey),
            iv: this.cryptoService.convertUnit8ArraytoB64(iv)
        }
    }
    convertB64toUnit8Array(secretKey: string, iv: string): { secretKey: Uint8Array, iv: Uint8Array } {
        return {
            secretKey: this.cryptoService.convertB64toUnit8Array(secretKey),
            iv: this.cryptoService.convertB64toUnit8Array(iv)
        }
    }


    async uploadFile(file: any): Promise<AxiosResponse> {
        const form = new FormData();
        console.log('from the uploadFile', file.iv);
        console.log(file.content);
        form.append('name', file.name);
        form.append('size', file.size);
        form.append('mime', file.mime);
        form.append('secret_key', file.secreteKey);
        form.append('iv', file.iv);
        form.append('file', file.content);
        form.append('parent_id', file.parent_id);
        file = form;
        return await fileApi.uploadFile(file);
    }
    
    async getAllFiles() {
        return await fileApi.getAllFiles();
    }

    async viewFile(id: number) {
        return await fileApi.viewFile(id);
    }


    async readFileAsArrayBuffer(fileReader: FileReader) {
        return new Promise((resolve, reject) => {
            // Set up event handlers for successful read and error
            fileReader.onload = (event) => {
                resolve(event.target.result); // ArrayBuffer containing the file content
            };
            fileReader.onerror = (error) => {
                reject(error);
            };

            // Start reading the file as an ArrayBuffer
        });
    }
    async getFileContentAsBuffer(selectedFile: File): Promise<Uint8Array> {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        return await this.readFileAsArrayBuffer(reader)
    }
}