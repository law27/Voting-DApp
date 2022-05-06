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
const { loginProcess } = require("./middlewares/auth");

app.use(bodyParser.json());
app.use(cookieParser());


// HTTP Connection
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.post('/authenticate', loginProcess, (req, res) => {
    res.redirect(301, '/redirect');
});

app.get('/redirect', async (req, res) => {
    const keyPair = await generateRSAKeyPairs();
    const publicKey = keyPair.publicKey;
    res.status(200).json({
        publicKey,
        url: '/vote'
    });
})

app.get('/vote', async (req, res) => {
    res.sendFile(__dirname + '/public/vote.html');
});


// Socket Connection
io.on('connection', socket => {
    const publicKey = cookie.parse(socket.handshake.headers.cookie).pub;
    socket.on('message', console.log);
    socket.on('voterList', console.log);
})


// Server connection
server.listen(3000, () => {
    console.log("Listening to port 3000");
});


// TODO: a lot to do