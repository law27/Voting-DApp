const { generateECCKeyPairs } = require("../services/crypto");
const { createNewUser, createNewPKI, getUserFromId } = require("../services/mongodb");


async function loginProcess(req, res, next) {
    const user = (await getUserFromId(req.body.aadharId))[0];
    if(user.password === req.body.password) {
        req.user = user;
        next();
    } else {
        res.status(400).json({
            statusCode: 400,
            error: "Username or password is wrong",
            url: "/"
        })
    }
}

function signUpProcess(req, res, next) {
    const constitution = req.body.constitution;
    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;
    const id = req.body.aadharId;
    const password = req.body.password;
    if( constitution && name && age && address && id && password ) {
        const data = {
            id,
            name,
            age,
            address,
            constitution,
            password
        }
        req.signUpData = data;
        next();
    } else {
        return res.status(400).json({
            statusCode: 400,
            message: "Not enough data"
        })
    }
}

async function processSignUp(req, res, next) {
    const signUpData = req.signUpData;
    try {
        const publicKeyPair = await generateECCKeyPairs();
        await createNewUser(signUpData);
        await createNewPKI({
            id: req.signUpData.id,
            public: publicKeyPair.publicKey,
            private: publicKeyPair.privateKey
        });
        res.status(200).json({
            statusCode: 200,
            message: "User created Succesully"
        })
    } catch( err ) {
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server error. Please try again sometime"
        })
    }
}

module.exports = {
    loginProcess,
    signUpProcess,
    processSignUp
}