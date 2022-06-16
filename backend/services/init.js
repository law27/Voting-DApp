const { MongoClient } = require("mongodb");
const { createClient } = require("redis");


async function getRedisClient() {
    const client = createClient({
        url: "redis://law27:Lawrance_27@redis-19375.c92.us-east-1-3.ec2.cloud.redislabs.com:19375"
    })
    await client.connect();
    return client;
}

async function getMongoClient() {
    const url = "mongodb+srv://law27:RPLVVUHBrFbQquqs@cluster0.ddqv5.mongodb.net/Voting-DApp?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    return client;
}


module.exports = {
    mongoClient: getMongoClient(),
    redisClient: getRedisClient()
}