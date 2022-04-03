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
const nbPageUser = 10;

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
                    //****CRUD USER */

                    ////***TEMPLATE DELETE */
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
////***TEMPLATE UPDATE */
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

    ////***TEMPLATE CREATE */
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

    ////***TEMPLATE FINDALL INI */
    app.get(prefixBackOffice+'/get-users', async (req, res) =>{        
        var p = 1;
        var orderby = "nom";
        var order = 1;
        /*if((req.params.page != null)){
            p = req.params.page;
        }
        if((req.params.orderby != null)){
            orderby = req.params.orderby;
        }
        if((req.params.order != null)){
            order = parseInt(req.params.order);
        }      */          
        console.log(p);
        const options = {
            page: p,
            limit: nbPageUser,
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
        const orderBy = {};
        orderBy[orderby] = order;
        var cursor = Users.aggregate([
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
                $sort: orderBy
            }
        ]);
        //cursor.match({nom: "Rakoto"});
        Users.aggregatePaginate(cursor, options)
        .then(results => {
            results['sortBy'] = orderby;
            results['order'] = order;
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

    ////***TEMPLATE SEARCH LIST */
    app.post(prefixBackOffice+'/search-users/:page?/:orderby?/:order?', async (req, res) =>{        
        
        console.log(req.body.nom);
        console.log(req.body.prenom);
        console.log(req.params.orderby);
        var p = 1;
        var orderby = "nom";
        var order = 1;
        var critere = {};
        if(req.body.nom!=null && req.body.nom !== "") critere["nom"] = {}, critere["nom"]["$regex"] = req.body.nom, critere["nom"]["$options"] = "i";
        if(req.body.prenom!=null && req.body.prenom !== "") critere["prenom"] = {}, critere["prenom"]["$regex"] = req.body.prenom, critere["prenom"]["$options"] = "i";
        if(req.body.email!=null && req.body.email !== "") critere["email"] = {}, critere["email"]["$regex"] = req.body.email, critere["email"]["$options"] = "i";
        if(req.body.adresse!=null && req.body.adresse !== "") critere["adresse"] = {}, critere["adresse"]["$regex"] = req.body.adresse, critere["adresse"]["$options"] = "i";
        if(req.body.ville!=null && req.body.ville !== "") critere["ville"] = {}, critere["ville"]["$regex"] = req.body.ville, critere["ville"]["$options"] = "i";
        if(req.body.role!=null && req.body.role !== "") critere["role"] = {}, critere["role"]["$regex"] = req.body.role, critere["role"]["$options"] = "i";
        console.log(critere);

        if((req.params.page != null)){
            p = req.params.page;
        }
        if((req.params.orderby != null)){
            orderby = req.params.orderby;
        }
        if((req.params.order != null)){
            order = parseInt(req.params.order);
        }                
        console.log(p);
        const options = {
            page: p,
            limit: nbPageUser,
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
        const orderBy = {};
        orderBy[orderby] = order;
        var cursor = Users.aggregate([
            {
                $match: critere
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
                $sort: orderBy
            }
        ]);
        //cursor.match({nom: "Rakoto"});
        Users.aggregatePaginate(cursor, options)
        .then(results => {
            results['sortBy'] = orderby;
            results['order'] = order;
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
 
    ////***TEMPLATE FICHE FINDBYID */
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
    
    ////***TEMPLATE PAGE UPDATE SI DATAFORM */
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

    ////***TEMPLATE PAGE CREATE SI DATAFORM */
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



                //**LOG BACK START*/
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
//**LOG BACK END*/



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




