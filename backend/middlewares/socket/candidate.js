const { getUserFromId, getCandidateListForConstiuition } = require("../../services/mongodb");


async function getCandidates( userId ) {
    const user = (await getUserFromId(userId))[0];
    const candidates = await getCandidateListForConstiuition(user.constitution);
    return candidates;
}

module.exports = {
    getCandidates
}