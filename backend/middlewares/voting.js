const { eccEncryption } = require("../services/crypto");
const { getKeyFromPKI } = require("../services/mongodb");
const axios = require("axios").default


async function proccessAndStoreInBlockChain(userId, data) {
    const pk = (await getKeyFromPKI( userId ))[0];
    const encryptedVoteData = await eccEncryption(data, pk.public);
    const postData = {
        voteData: encryptedVoteData,
        id: userId,
        location: process.env.LOCATION
    }
    axios.post("http://localhost:3001/add", postData);
}

module.exports = {
    proccessAndStoreInBlockChain
}