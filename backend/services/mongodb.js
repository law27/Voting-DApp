const mongoClient = require("./init").mongoClient;

function getDBObject( client, dbName ) {
    return client.db(dbName);
}

function getCollectionsObject( dbObject, collectionName ) {
    return dbObject.collection(collectionName);
}

async function getUserWithUserName( userName ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "Users");
    return await collectionObject.find({name: userName}).toArray();
}

module.exports = {
    getUserWithUserName
}