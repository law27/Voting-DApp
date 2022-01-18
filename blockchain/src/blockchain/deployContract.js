const { web3, getContractForDeployment } = require("../blockchain/web3");
const smartContract = require("../../artifacts/contracts/Deploy.sol/Deploy.json");
const { addContractAddressToDB, addTransactionHashToDB } = require("../db/dbActions")

async function deployContract( voteData, id, location ) {
    const now = Date.now();
    const contract = getContractForDeployment();

    const deploymentOptions = {
        data: smartContract.bytecode,
        arguments: [voteData, id, location, web3.utils.toBN( now )]
    }

    const transactionOptions = {
        from: process.env.ACCOUNT,
        gas: 1500000,
        gasPrice: '30000000000000'
    }

    await contract.deploy(deploymentOptions)
        .send( transactionOptions )
        .on('error', console.error)
        .on('transactionHash', transactionHash => addTransactionHashToDB(id, transactionHash))
        .on('receipt', receipt => addContractAddressToDB( id, receipt.contractAddress ))
}

module.exports = deployContract;