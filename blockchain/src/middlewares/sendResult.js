function sendResult(req, res, next) {
    const { result } = req;
    res.status(200).json(result);
    next();
}

module.exports = sendResult;
