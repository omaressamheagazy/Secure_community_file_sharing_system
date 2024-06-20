export class PasswrodKeyDerivation {
    constructor(passwordDerivationProvider) {
      this.passwordDerivationProvider = passwordDerivationProvider;
    }
  
  
    generateDerivedPasswordKey(password, salt) {
        return this.passwordDerivationProvider.generateDerivedPasswordKey(password, salt);
    }
  }