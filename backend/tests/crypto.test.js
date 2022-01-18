const { 
    generateNTRUKeyPairs,
    generateECCKeyPairs,
    eccEncryption, 
    eccDecryption,
    ntruEncryption,
    ntruDecryption
} = require("../services/crypto");


test("Test NTRU Encryption", async () => {
    const data = "Lawrance";
    const keyPair = await generateNTRUKeyPairs();
    const encryptedData = await ntruEncryption( data, keyPair.publicKey);
    const decryptedData = await ntruDecryption(encryptedData, keyPair.privateKey);
    expect(decryptedData).toBe(data)
})

test("Test ECC Encryption", async () => {
    const data = "Lawrance";
    const keyPair = await generateECCKeyPairs();
    const encryptedData = await eccEncryption( data, keyPair.publicKey);
    const decryptedData = await eccDecryption(encryptedData, keyPair.privateKey);
    expect(decryptedData).toBe(data);
})
