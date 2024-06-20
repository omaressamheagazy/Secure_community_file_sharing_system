export class KeyDerivation {
    constructor(keyDerivationProvider) {
      this.keyDerivationProvider = keyDerivationProvider;
    }
    generateDerivedKey(KeyBuffer, salt) {
        return this.keyDerivationProvider.generateDerivedKey(KeyBuffer, salt);
    }
  }