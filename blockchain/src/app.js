const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const addBlock = require("./middlewares/addBlock");
const getData = require("./middlewares/getDataFromContract");
const sendResult = require("./middlewares/sendResult");

app.post("/add", addBlock);
// app.get("/data" ) // TODO: Implement gettting all the data from Blockchain
app.get("/data/:id", getData, sendResult);

module.exports = app;
