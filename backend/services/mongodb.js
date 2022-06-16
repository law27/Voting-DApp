const mongoClient = require("./init").mongoClient;

function getDBObject( client, dbName ) {
    return client.db(dbName);
}

function getCollectionsObject( dbObject, collectionName ) {
    return dbObject.collection(collectionName);
}

async function getCandidateListForConstiuition( constitution ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "Candidates");
    return (await collectionObject.find({ constitution }).toArray())[0];
}

async function getUserFromId( id ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "Users");
    return await collectionObject.find({ id } ).toArray();
}

async function createNewUser( data ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "Users");
    return await collectionObject.insertOne(data);
}

async function createNewPKI( data ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "PKI");
    return await collectionObject.insertOne(data);
}

async function getKeyFromPKI( id ) {
    const client = await mongoClient;
    const dbObject = getDBObject(client, "Voting-DApp");
    const collectionObject = getCollectionsObject(dbObject, "PKI");
    return await collectionObject.find({ id } ).toArray();
}

module.exports = {
    getCandidateListForConstiuition,
    getUserFromId,
    createNewUser,
    createNewPKI,
    getKeyFromPKI
}