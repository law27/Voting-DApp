const Web3 = require("web3");
const web3 = new Web3(process.env.PROVIDER);
const smartContract = require("../../artifacts/contracts/Deploy.sol/Deploy.json");

const contract = new web3.eth.Contract(smartContract.abi);

function getContractForDeployment() {
    return contract;
}

function getContractForQueries( address ) {
    return new web3.eth.Contract(smartContract.abi, address);
}

module.exports = {
    web3,
    getContractForDeployment,
    getContractForQueries
};