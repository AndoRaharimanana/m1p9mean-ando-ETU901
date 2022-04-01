const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer'); 
const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Users, Session } = require("./model");
var service = require("./service");
const mongoose = require('mongoose');
var crypto = require('crypto');
  
const dbName = "e-kaly";
const url ='mongodb://localhost:27017';
const prefixBackOffice = "/back-office";

app.listen(1010, function(){ 
    var u = new Users();
    u.id = 546456564;
    console.log(service.createToken(u));  
    console.log("listening on 1010");
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //res.header('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect("mongodb://localhost:27017/e-kaly", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(client=>{
    console.log('Connected to Database Mongoose');  
    //**************BACK OFFICE START***************///

    app.post(prefixBackOffice+'/login', (req, res) => {
        console.log(req.body.email +"/"+req.body.mdp);
        Users.findOne({
            $and:[
                {
                    email: req.body.email 
                },

                {
                    mdp: service.crypt(req.body.mdp) 
                }                
            ]
        })
        .then(result => {
            console.log(result);
            console.log(result.id);
            res.json(result);            
        })
        .catch(error => console.error(error))    
    });

    app.get(prefixBackOffice+'/get-users', (req, res) =>{        
        const cursor = Users.aggregate([
            {
                $lookup: {
                    from: "ville",
                    localField: "ville",
                    foreignField: "_id",
                    as: "ville"
                }
            },
            {
                $lookup:{
                    from: "role",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            }
        ])
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(error => console.error(error))            
    });     
}).catch(console.error);

/*MongoClient.connect(url, {useNewUrlParser: true})
    .then(client =>{
        const db = client.db(dbName);
        console.log('Connected to Database');    
        
        //BACK-OFFICE: get list users
        app.get('/', (req, res) =>{
            var collections = db.collection('users');        
            const cursor = collections.find().toArray()
            .then(results => {
                res.json(results);
            })
            .catch(error => console.error(error))            
        });        
        
    })
    .catch(console.error); */
    //**************BACK OFFICE END***************///
