// This file contain the format for the crypto functions used in the application, so it will be as a reference for the developers.
// Libariries used : crypto-js, pbkdf2, scrypt, hkdf, rsa, aes, webcrypto API, node-forge.

/**
 * Foramt for the crypto functions
 */
const aesEncryption =
{
    algorthim: "AES-CBC",
    libarary: "Web Crypto API"
    data: "Unit8Array",
    outputFormat: "ArrayBuffer",
    keys: "Uni8Array",
}

const aesDecryption =
{
    algorthim: "AES-CBC",
    libarary: "Web Crypto API"
    data: "Unit8Array",
    output: "ArrayBuffer",
    keys: "Uni8Array",
}

const rsaEncryption =
{
    algorthim: "RSA-OAEP",
    libarary: "node-forge"
    data: "string",
    output: "base64",
    keys: "PEM",
}

const rsaDecryption =
{
    algorthim: "RSA-OAEP",
    libarary: "node-forge"
    data: "base64",
    output: "string",
    keys: "PEM",
}

const HKDF =
{
    algorthim: "HKDF",
    libarary: "Web Crypto API",
    data: "string",
    output: "Unit8Array",
}

const PBKDF2 =
{
    algorthim: "PBKDF2",
    libarary: "Web Crypto API",
    data: "string",
    output: "Unit8Array",
}

const scrypt =
{
    algorthim: "scrypt",
    libarary: "scrypt-js",
    data: "string",
    output: "Unit8Array",
}

/**
 * Sign up
 *
 */
// 1. the password is in unit8Array, after the password is dervied using PBKDF2
// 2. the password is converted to base64 (Unit8array to Base64)
// 3. the gernated private key is in PEM format(PEM),then it parsed using TextEncoder to Unit8Array for encryption purpose
// 4. the private key is encrypted and the output is in ArrayBuffer format
// 5. the encrypted private key is converted to base64 is stored in the database
// 6. the public key is stored in the database, it its original fomrat (PEM)

/**
 * Login
 */
// 0. the encryptionKey is in Unit8Array format
// 1. the password is in unit8Array, after the password is dervied using PBKDF2
// 2. the password is converted to base64 (Unit8array to Base64)
// 3. convert the private key feteched from database from base64 to Unit8Array
// 4. the private key is decrypted and the output is in ArrayBuffer format
// 5. the private key is converted to PEM (String) format by TectDecoder
// 6. the encrypted keys is converted to base64, and stored in the browser session

/**
 *  File upload
 */

// 1. the user's encryption keys are stored in the browser session in base64 format
// 2. the user's encryption keys get converted to its origianl format (Unit8Array) for encryption purpose
// 3. the file's key is generated in Unit8Array format
// 4. the file content is encrypted using the file keys and the output is in ArrayBuffer format
// 5. the file's key is encrypted and the output is in ArrayBuffer format
// 6. the encrypted file's key is converted to base64 and stored in the database

/**
 * File download
 */
// 1. get the user's encryption keys from the browser session and convert it to Unit8Array
// 2. get the file's key from the database and convert it to Unit8Array
// 3. decrypt the file's(iv, secret key) key and the output is in ArrayBuffer format
// 4. the file's key is converted to Unit8Array format
// 5. the file content is retrived from the database in ArrayBuffer format and the it converted to Unit8Array for decryption
// 6. the file content is decrypted and the output is in ArrayBuffer format

/**
 * Create Community
 */ 
// 1. community public and private keys are generated in PEM(string) format
// 2. user's key pair are retrived from the browser session in base64 format
// 3. the membership keys are generated in Unit8Array format- AES
// 4. the membership keys are converted to to b64 for RSA encryption
// 5. the membership keys are encrypted and the output is in base64 format
// 6. the private key is converted to Unit8Array format using TextEncoder for encryption purpuse
// 7. the private key is encrypted and the output is in ArrayBuffer format
// 8. the encrypted private key is converted to base64 and stored in the database


/**
 * Format for data stored in the database and browser session
 *
 */
// 1. the encryption keys, the secret key, and iv , are stored in the database in base64 format - Original format: Unit8Array
// 2. the key pairs, private and public keys are stored in the database in its original format as a json object - Original format: PEM
