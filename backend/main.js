const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cookie: true
});
const bodyParser = require("body-parser");
const { generateRSAKeyPairs, rsaDecryption } = require("./services/crypto");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const { loginProcess, signUpProcess, processSignUp } = require("./middlewares/auth");
const { sessionStore } = require("./services/redis");
const { getCandidates } = require("./middlewares/socket/candidate");
const { proccessAndStoreInBlockChain } = require("./middlewares/voting");
require("dotenv").config()

app.use(bodyParser.json());
app.use(cookieParser());


// HTTP Connection
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.post('/authenticate', loginProcess, async (req, res) => {
    const keyPair = await generateRSAKeyPairs();
    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.privateKey;
    sessionStore[req.user.id] = {
        publicKey, privateKey
     } // TODO: Store this is in redis session
    sessionStore[publicKey] = req.user.id;
    res.status(200).json({
        publicKey,
        url: '/vote'
    });
});

app.get('/signup', (_req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
})

app.post('/signup', signUpProcess, processSignUp);


app.get('/vote', async (req, res) => {
    res.sendFile(__dirname + '/public/vote.html');
});


// Socket Connection
io.on('connection', socket => {
    socket.on('init', async req => {
        if(socket.handshake.auth.token === req.token) {
            const candidates = await getCandidates(sessionStore[req.token]);
            socket.emit('candidateList', candidates.candidates);
        }
    });
    socket.on('voteData', req => {
        const userId = sessionStore[req.token];
        if(userId && sessionStore[userId].publicKey === req.token) {
            const decryptedDada = rsaDecryption(req.voteData, sessionStore[sessionStore[req.token]].privateKey);
            proccessAndStoreInBlockChain(userId, decryptedDada);
        }
    })
})


// Server connection
server.listen(3000, () => {
    console.log("Listening to port 3000");
});