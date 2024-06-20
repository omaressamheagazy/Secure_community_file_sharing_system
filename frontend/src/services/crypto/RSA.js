export class RSA {
  constructor(cryptoProvider) {
    this.cryptoProvider = cryptoProvider;
  }

  generateRSAKeys() {
    return this.cryptoProvider.generateRSAKeys();
  }

  getPublicKey() {
    return this.cryptoProvider.getPublicKey();
  }
  getPrivateKey() {
    return this.cryptoProvider.getPrivateKey();
  }

  encrypt(message) {
      return this.cryptoProvider.encryptMessage(message, publicKey);
  }

  decrypt(encryptedMessage, privateKey) {
    return this.cryptoProvider.decryptMessage(encryptedMessage, privateKey);
  }
}