const { 
    generateNTRUKeyPairs,
    generateECCKeyPairs,
    generateRSAKeyPairs,
    eccEncryption, 
    eccDecryption,
    rsaEncryption,
    rsaDecryption,
} = require("../services/crypto");

test("Test ECC Encryption", async () => {
    const data = "Lawrance";
    const keyPair = await generateECCKeyPairs();
    const encryptedData = await eccEncryption( data, keyPair.publicKey);
    const decryptedData = await eccDecryption(encryptedData, keyPair.privateKey);
    expect(decryptedData).toBe(data);
})

test("Test RSA Encryption", async () => {
    const data = "Lawrance";
    const keyPair = await generateRSAKeyPairs();
    const encryptedData = await rsaEncryption(data, keyPair.publicKey);
    const decryptedData = await rsaDecryption(encryptedData, keyPair.privateKey);
    expect(decryptedData).toBe(data);
})
