
const map = {};
function addContractAddressToDB(id, contractAddress) {
    map[id] = contractAddress;
    console.log(id, contractAddress);
}

function addTransactionHashToDB(id, txHash) {
    console.log(id, txHash);
}

function getContractAddress( id ) {
    return map[id];
}

module.exports = {
    addContractAddressToDB,
    addTransactionHashToDB,
    getContractAddress
};