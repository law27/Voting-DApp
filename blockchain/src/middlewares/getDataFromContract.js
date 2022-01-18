const getData = require("../blockchain/queryContract");

async function getDataFromContract(req, res, next) {
    const userId = req.params.id;
    await getData(req, next, userId);
}

module.exports = getDataFromContract;
