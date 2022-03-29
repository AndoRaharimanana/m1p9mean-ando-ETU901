const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer'); 
const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  
const dbName = "refresh-mongodb";
const url ='mongodb://localhost:27017';

app.listen(1010, function(){    
    console.log("listening on 1010");
});

MongoClient.connect(url, {useNewUrlParser: true})
    .then(client =>{
        const db = client.db(dbName);
        const collections = db.collection('myCollection');
        console.log('Connected to Database');        
    })
    .catch(console.error); 
