var express = require('express');
var path = require('path');
var {MongoClient} = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var new_db = "mongodb+srv://law27:Lawrance27$@cluster0.4lu1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var mongo = new MongoClient(new_db);
													
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
}).listen(8080);

console.log("Server listening at : 8080");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

app.post('/signUp' ,function(req,res){
	var name = req.body.name;
	var aadhar= req.body.email;
	var password = req.body.password;
					
    var data = {
		"name":name,
		"password": password, 
	}

mongo.connect(function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
        const database = mongo.db('UserRegistration');
        const details = database.collection('details');
		details.insertOne(data);
});
	
	
});