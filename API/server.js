const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer'); 
const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Users, Session, Role, Ville } = require("./model");
var service = require("./service");
const mongoose = require('mongoose');
var crypto = require('crypto');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");  

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

    app.delete(prefixBackOffice+'/user/:id', async (req, res) =>{
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");        
        console.log(req.params.id);
        await Users.findByIdAndDelete(
            req.params.id
        )
        .then(result => {
            console.log(result);
            console.log("user delete");
            var send = {
                status: 200,
                message: "success",
                data: []
            };
            res.json(send);
        })
        .catch(error => console.error(error))
    });

    app.put(prefixBackOffice+'/user/update', async (req, res) =>{
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        await Users.findByIdAndUpdate(req.body.id, 
            {        nom : req.body.nom,
                prenom : req.body.prenom,   
                email : req.body.email,   
                sexe : req.body.sexe,   
                adresse : req.body.adresse,   
                ville: mongoose.Types.ObjectId(req.body.ville),  
                contact : req.body.contact,   
                role : mongoose.Types.ObjectId(req.body.role)   })
            .then(results =>{
                console.log(results);
                console.log("user modifier");
                var send = {
                    status: 200,
                    message: "success",
                    data: []
                };
                res.json(send);
            })
            .catch(console.error);
    });    
    
    app.get(prefixBackOffice+'/user/update/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        var dataform = await service.dataForm();
        const cursor = await Users.aggregate([
            {
                $match:{_id: mongoose.Types.ObjectId(req.params.id)}
            },            
            {
                $lookup: {
                    from: "villes",
                    localField: "ville",
                    foreignField: "_id",
                    as: "ville"
                }
            },
            {
                $lookup:{
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            },
            {
                $limit: 1
            }
        ])
        .then(results => {
            console.log(results);            
            var send = {
                status: 200,
                message: "success",
                data: {
                    data: results,
                    dataform: dataform
                }
            };
            res.json(send);
        })
        .catch(error => console.error(error))            
    });   

    app.get(prefixBackOffice+'/user/create', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        var dataform = await service.dataForm();
        var send = {
            status: 200,
            message: "success",
            data: dataform
        };
        res.json(send);                    
    });    


    app.post(prefixBackOffice+'/user/create', async (req, res) => {
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));        
        
        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }   
        console.log("token valide");
        var newUser = new Users();
        newUser.nom = req.body.nom;
        newUser.prenom = req.body.prenom;   
        newUser.email = req.body.email;   
        newUser.sexe = req.body.sexe;   
        newUser.adresse = req.body.adresse;   
        newUser.mdp = service.crypt(req.body.mdp);   
        newUser.ville = req.body.ville;   
        newUser.contact = req.body.contact;   
        newUser.role = req.body.role;   


        await newUser.save()
        .then(result =>{
            console.log(result);
            console.log("user enregistrer");
            var send = {
                status: 200,
                message: "success",
                data: []
            };
            res.json(send);
        })
        .catch(console.error);
    });

    app.get(prefixBackOffice+'/signout', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        await service.tokenExpire(req.header('authorization'));
        var send = {
            status: 200,
            message: "success",
            data: []
        };
        res.json(send);                    
    });     


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
            var token = service.createToken(result);
            service.saveToken(result, token);
            var send = {
                status: 200,
                message: "success",
                token: token,
                data: result
            };
            res.json(send);            
        })
        .catch(error => console.error(error))    
    });

    app.get(prefixBackOffice+'/get-users/:page?', async (req, res) =>{        
        var p = 1;
        if((req.params.page != null)){
            p = req.params.page;
        }
        console.log(p);
        const options = {
            page: p,
            limit: 2,
          };
console.log(options);
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        const cursor = await Users.aggregate([
            {
                $lookup: {
                    from: "villes",
                    localField: "ville",
                    foreignField: "_id",
                    as: "ville"
                }
            },
            {
                $lookup:{
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            }
        ]);
        Users.aggregatePaginate(cursor, options)
        .then(results => {
            console.log(results);
            var send = {
                status: 200,
                message: "success",
                data: results
            };
            res.json(send);
        })
        .catch(error => console.error(error))            
    });    
    
    app.get(prefixBackOffice+'/get-user/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'));

        console.log(denied);
        if(!denied){
            console.log("token invalide");
            var send = {
                status: 202,
                message: "Accés refusé",
                data: []
            };
            res.json(send);
            return;
        }    
        console.log("token valide");
        const cursor = await Users.aggregate([
            {
                $match:{_id: mongoose.Types.ObjectId(req.params.id)}
            },            
            {
                $lookup: {
                    from: "villes",
                    localField: "ville",
                    foreignField: "_id",
                    as: "ville"
                }
            },
            {
                $lookup:{
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            },
            {
                $limit: 1
            }
        ])
        .then(results => {
            console.log(results);
            var send = {
                status: 200,
                message: "success",
                data: results
            };
            res.json(send);
        })
        .catch(error => console.error(error))            
    });   

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



    
    //***********GENERAL START ****/

   
    //***********GENERAL END ****/

}).catch(console.error);




