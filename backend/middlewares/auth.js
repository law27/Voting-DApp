const { getUserWithUserName } = require("../services/mongodb");


async function loginProcess(req, res, next) {
    const user = await getUserWithUserName(req.body.id);
    if(user.password === req.body.password) {
        next();
    }
    res.status(400).json({
        statusCode: 400,
        error: "Username or password is wrong"
    })
}

async function signUpProcess(req, res, next) {
    // TODO
    next();
}

module.exports = {
    loginProcess,
    signUpProcess
}