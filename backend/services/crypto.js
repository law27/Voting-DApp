const ecc = require('eth-crypto');
const textEncoding = require("text-encoding");
const rsa = require("node-forge").pki.rsa;
const forge = require("node-forge");
const jsencrypt = require("node-jsencrypt")

async function generateECCKeyPairs() {
    const identity = await ecc.createIdentity();
    return identity;
}

async function eccEncryption( data, publicKey ) {
    const encryptedData = await ecc.encryptWithPublicKey(publicKey, data);
    return ecc.cipher.stringify(encryptedData);
}

async function eccDecryption( data, privateKey ) {
    const parsedData = ecc.cipher.parse(data);
    const decryptedData = await ecc.decryptWithPrivateKey(privateKey, parsedData);
    return decryptedData;
}

async function generateRSAKeyPairs() {
    const keyPair = rsa.generateKeyPair({bits: 1024});
    const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
    return {publicKey, privateKey};
}



function rsaEncryption(data, publicKey) {
    const rsaPublicKey = forge.pki.publicKeyFromPem(publicKey);
    const encrypt = new jsencrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
}

function rsaDecryption(data, privateKey) {
    const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey);
    const decrypt = new jsencrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(data.toString());
}



module.exports = {
    generateECCKeyPairs,
    generateRSAKeyPairs,
    eccEncryption,
    eccDecryption,
    rsaEncryption,
    rsaDecryption
}
