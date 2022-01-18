const ntru = require("ntru");
const ecc = require('eth-crypto');
const textEncoding = require("text-encoding");

async function generateNTRUKeyPairs() {
    const { privateKey, publicKey } = await ntru.keyPair();
    return { privateKey, publicKey };
}

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

async function ntruEncryption( data, publicKey ) {
    const textEncoder = textEncoding.TextEncoder;
    const uint8DataArray = new textEncoder().encode(data);
    const encryptedData = await ntru.encrypt(uint8DataArray, publicKey);
    return encryptedData;
}

async function ntruDecryption( data, privateKey ) {
    const textDecoder = textEncoding.TextDecoder;
    const decryptedData = await ntru.decrypt(data, privateKey);
    const uintData = [];
    for(let i = 0; i < decryptedData.length; i++) {
        uintData.push(decryptedData[i]);
    }
    const plainData = new textDecoder().decode(new Uint8Array(uintData));
    return plainData;
}

module.exports = {
    generateECCKeyPairs,
    generateNTRUKeyPairs,
    eccEncryption,
    eccDecryption,
    ntruEncryption,
    ntruDecryption,
}
