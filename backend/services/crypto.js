const ecc = require('eth-crypto');
const textEncoding = require("text-encoding");
const rsa = require("node-forge").pki.rsa;
const forge = require("node-forge");

async function generateECCKeyPairs() {
    const identity = await ecc.createIdentity();
    return identity;
}

async function eccEncryption( data, publicKey ) {
    const encryptedData = await ecc.encryptWithPublicKey(publicKey, data);
    return encryptedData;
}

async function eccDecryption( data, privateKey ) {
    const decryptedData = await ecc.decryptWithPrivateKey(privateKey, data);
    return decryptedData;
}

async function generateRSAKeyPairs() {
    const keyPair = rsa.generateKeyPair({bits: 1024});
    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
    return {publicKey, privateKey};
}



async function rsaEncryption(data, publicKey) {
    const rsaPublicKey = forge.pki.publicKeyFromPem(publicKey);
    return await rsaPublicKey.encrypt(data);
}

async function rsaDecryption(data, privateKey) {
    const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey);
    return await rsaPrivateKey.decrypt(data);
}



module.exports = {
    generateECCKeyPairs,
    generateRSAKeyPairs,
    eccEncryption,
    eccDecryption,
    rsaEncryption,
    rsaDecryption
}
