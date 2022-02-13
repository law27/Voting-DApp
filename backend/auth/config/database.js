const mongoose = require("mongoose");
const { MONGO_URI} = process.env;

exports.connect = () => {

    //connecting to the database
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((error)  => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
}