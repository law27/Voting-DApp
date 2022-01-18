const { getContractAddress } = require("../db/dbActions");
const { getContractForQueries } = require("./web3");

async function getDataFromContract(req, next, userId) {
    const contractAddress = getContractAddress(userId);
    const contract = getContractForQueries(contractAddress);

    await contract.methods
        .getAllData()
        .call({ from: process.env.ACCOUNT }, (error, result) => {
            if (error) {
                next(error);
            } else {
                console.log(result);
                req.result = result;
                next();
            }
        });
}

module.exports = getDataFromContract;
