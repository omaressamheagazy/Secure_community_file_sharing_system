/**
 * crypto.js
 * 
 * This file contains configurations for various cryptographic algorithms.
 */

/**
 * Configuration for the PBKDF2 (Password-Based Key Derivation Function 2) algorithm.
 */
export const pbkdf2Config = {
  iterations: 100000, // The number of iterations to perform.
  hashAlgorithm: 'SHA-256', // The hash algorithm to use.
  keyLengthBits: 128 // The length of the derived key in bits.
};

/**
* Configuration for the Scrypt key derivation function.
*/
export const scryptConfig = {
  N: 16384, // CPU/memory cost factor.
  r: 8, // Block size.
  p: 1, // Parallelization factor.
  dkLen: 32 // Length of the derived key.
};

/**
* Configuration for the HKDF (HMAC-based Key Derivation Function) algorithm.
*/
export const hkdfConfig = {
  hashAlgorithm: 'SHA-256', // The hash algorithm to use.
  keyLengthBits : 128 // The length of the derived key in bits.
};

/**
* Configuration for the RSA (Rivest–Shamir–Adleman) algorithm.
*/
export const rsaConfig = {
  keySize: 2048, // The size of the key in bits.
  publicExponent: 65537, // The public exponent.
};

/**
* Configuration for the AES (Advanced Encryption Standard) algorithm.
*/
export const aesConfig = {
  keySize: 256, // The size of the key in bits.
  mode: 'CBC', // The mode of operation.
};