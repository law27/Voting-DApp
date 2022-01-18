const deployContract = require("../blockchain/deployContract");

async function addBlock(req, res, next) {
    const { body } = req;
    console.log(body);
    const { voteData, id, location } = body;
    await deployContract( voteData, id, location);
    res.status(200).json({ status: "Success"});
    next();
}

module.exports = addBlock;