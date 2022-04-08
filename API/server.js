const express = require('express');
const bodyParser = require('body-parser');
const {  ServerApiVersion } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
var nodemailer = require('nodemailer'); 
const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Users, Session, Role, Ville, Resto, CategoriePlat, Plat } = require("./model");
var service = require("./service");
const mongoose = require('mongoose');
var crypto = require('crypto');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");  
var formidable = require('formidable'); 
var fs = require('fs');

const dbName = "e-kaly";
const url ="mongodb://localhost:27017/e-kaly";
//const url = 'mongodb+srv://nanando:Ar12252831@refresh-mongodb.ysocs.mongodb.net/e-kaly-preprod?retryWrites=true&w=majority';
const prefixBackOffice = "/back-office";
const prefixResto = "/resto";

const access_backoffice = [1, 2, 3];
const access_resto = [1, 2, 3];
const nbPageUser = 10;

//process.env.PORT
app.listen(1010  , function(){ 
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

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client=>{
    console.log('Connected to Database Mongoose');  

app.get('/page-upload-test', (req, res)=>{
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/upload-test" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();    
});

app.post('/upload-test', (req, res) =>{
    console.log("azy1");
    var form = new formidable.IncomingForm();
    console.log("azy2");
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        console.log("azy");
        console.log(files);
        var oldpath = files.filetoupload.filepath;
        var newpath = 'C:/Users/rahar/Documents/MEAN/' + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end(); 
        });
    });
});

    ///////////********RESTO START* */
////**/*GET RESTO PROP USER START*/
                    app.get(prefixResto+'/choose', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
                        console.log(denied);
                        if(denied == null){
                            console.log("token invalide");
                            var send = {
                                status: 202,
                                message: "Accés refusé",
                                data: []
                            };
                            res.json(send);
                            return;
                        }  
                        var send = {
                            status: 200,
                            message: "success",
                            data: denied[0].restos
                        };
                        res.json(send);                        
                    });  
////**/*GET RESTO PROP USER END*/


/****CRUD  PLAT START */


                    ////***TEMPLATE DELETE */
                    app.delete(prefixResto+'/plat/:restoid/:id', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }   
                        console.log("token valide");        
                        console.log(req.params.id);
                        await Plat.findByIdAndDelete(
                            req.params.id
                        )
                        .then(result => {
                            console.log(result);
                            console.log("plat delete");
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
                    app.put(prefixResto+'/plat/update/:restoid', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }   
                        console.log("token valide");
                        console.log(req.body.id);
                        console.log(req.body.libelle);
                        await Plat.findByIdAndUpdate(req.body.id, 
                            {        libelle : req.body.libelle,
                                     categorie : mongoose.Types.ObjectId(req.body.categorie),
                                     createur : mongoose.Types.ObjectId(req.params.restoid),
                                     description : req.body.description,
                                     recette : req.body.recette        
                              })
                            .then(results =>{
                                console.log(results);
                                console.log("plat modifier");
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
                    app.post(prefixResto+'/plat/create/:restoid', async (req, res) => {
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }   
                        console.log("token valide");
                        var newPlat = new Plat();
                        newPlat.libelle = req.body.libelle;        
                        newPlat.categorie = mongoose.Types.ObjectId(req.body.categorie);        
                        newPlat.createur = mongoose.Types.ObjectId(req.params.restoid);        
                        newPlat.description = req.body.description;        
                        newPlat.recette = req.body.recette;        
                
                
                        await newPlat.save()
                        .then(result =>{
                            console.log(result);
                            console.log("plat enregistrer");
                            var send = {
                                status: 200,
                                message: "success",
                                data: result
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                    });       
                
                    ////***TEMPLATE FINDALL INI */
                    app.get(prefixResto+'/get-plats/:restoid', async (req, res) =>{                                
                        var p = 1;
                        var orderby = "libelle";
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
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }    

                        console.log("token valide");
                        const orderBy = {};
                        orderBy[orderby] = order;
                        var dataform = await service.getCategoriePlat({});                        
                        var cursor = Plat.aggregate([
                            {
                                $match: {createur: mongoose.Types.ObjectId(req.params.restoid)}
                            },  
                            {
                                $lookup: {
                                    from: "categorieplats",
                                    localField: "categorie",
                                    foreignField: "_id",
                                    as: "categorie"
                                }
                            },                          
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Plat.aggregatePaginate(cursor, options)
                        .then(results => {
                            results['sortBy'] = orderby;
                            results['order'] = order;
                            results['dataform'] = dataform;
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
                    app.post(prefixResto+'/search-plats/:restoid/:page?/:orderby?/:order?', async (req, res) =>{        
                        
  
                        var p = 1;
                        var orderby = "libelle";
                        var order = 1;
                        var critere = {};
                        if(req.body.libelle!=null && req.body.libelle !== "") critere["libelle"] = {}, critere["libelle"]["$regex"] = req.body.libelle, critere["libelle"]["$options"] = "i";
                        if(req.body.categorie!=null && req.body.categorie !== "") critere["categorie"] = mongoose.Types.ObjectId(req.body.categorie);
                        critere["createur"] = mongoose.Types.ObjectId(req.params.restoid);
                        if(req.body.description!=null && req.body.description !== "") critere["description"] = {}, critere["description"]["$regex"] = req.body.description, critere["description"]["$options"] = "i";
                        if(req.body.recette!=null && req.body.recette !== "") critere["recette"] = {}, critere["recette"]["$regex"] = req.body.recette, critere["recette"]["$options"] = "i";
                        
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
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }   
                        console.log("token valide");
                        const orderBy = {};
                        orderBy[orderby] = order;
                        var dataform = await service.getCategoriePlat({});                        
                        var cursor = Plat.aggregate([
                            {
                                $match: critere
                            },  
                            {
                                $lookup: {
                                    from: "categorieplats",
                                    localField: "categorie",
                                    foreignField: "_id",
                                    as: "categorie"
                                }
                            
                            },
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Plat.aggregatePaginate(cursor, options)
                        .then(results => {
                            results['sortBy'] = orderby;
                            results['order'] = order;
                            results['dataform'] = dataform;
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
                    app.get(prefixResto+'/get-plat/:restoid/:id', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                        
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

                        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
                        if(!denied2){
                            console.log("token invalide");
                            var send = {
                                status: 201,
                                message: "Choix resto",
                                data: []
                            };
                            res.json(send);
                            return;
                        }   
                        console.log("token valide");
                        const cursor = await Plat.aggregate([
                            {
                                $match:{_id: mongoose.Types.ObjectId(req.params.id)}
                            },            
                            {
                                $lookup: {
                                    from: "categorieplats",
                                    localField: "categorie",
                                    foreignField: "_id",
                                    as: "categorie"
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
  
    ////***TEMPLATE PAGE CREATE SI DATAFORM */
    app.get(prefixResto+'/plat/create/:restoid', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
        if(!denied2){
            console.log("token invalide");
            var send = {
                status: 201,
                message: "Choix resto",
                data: []
            };
            res.json(send);
            return;
        }     
        console.log("token valide");
        var dataform = await service.getCategoriePlat({});                        
        var send = {
            status: 200,
            message: "success",
            data: dataform
        };
        res.json(send);                    
    });  


    ////***TEMPLATE PAGE UPDATE SI DATAFORM */
    app.get(prefixResto+'/plat/update/:restoid/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuthRestoChoose(req.header('authorization'), 2);
                
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

        var denied2 = await service.checkAuthResto(req.header('authorization'), req.params.restoid, 2);
        if(!denied2){
            console.log("token invalide");
            var send = {
                status: 201,
                message: "Choix resto",
                data: []
            };
            res.json(send);
            return;
        }   
        console.log("token valide");
        var dataform = await service.getCategoriePlat({});
        const cursor = await Plat.findOne(
            {
                _id: mongoose.Types.ObjectId(req.params.id)
            })
        .then(results => {
            console.log(results);            
            var send = {
                status: 200,
                message: "success",
                data: results,
                dataform: dataform
            };
            res.json(send);
        })
        .catch(error => console.error(error))            
    });      
  
    /****CRUD PLAT END */   


  


    ////////////*****RESTO END */
    
    
    //**************BACK OFFICE START***************///

/****CRUD CATEGORIE PLAT START */
                    ////***TEMPLATE DELETE */
                    app.delete(prefixBackOffice+'/categorieplat/:id', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        await CategoriePlat.findByIdAndDelete(
                            req.params.id
                        )
                        .then(result => {
                            console.log(result);
                            console.log("categorieplat delete");
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
                    app.put(prefixBackOffice+'/categorieplat/update', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        console.log(req.body.id);
                        console.log(req.body.libelle);
                        await CategoriePlat.findByIdAndUpdate(req.body.id, 
                            {        libelle : req.body.libelle
                              })
                            .then(results =>{
                                console.log(results);
                                console.log("categorieplat modifier");
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
                    app.post(prefixBackOffice+'/categorieplat/create', async (req, res) => {
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var newCategoriePlat = new CategoriePlat();
                        newCategoriePlat.libelle = req.body.libelle;                              
                
                
                        await newCategoriePlat.save()
                        .then(result =>{
                            console.log(result);
                            console.log("categorieplat enregistrer");
                            var send = {
                                status: 200,
                                message: "success",
                                data: result
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                    });       
                
                    ////***TEMPLATE FINDALL INI */
                    app.get(prefixBackOffice+'/get-categorieplats', async (req, res) =>{                                
                        var p = 1;
                        var orderby = "libelle";
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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = CategoriePlat.aggregate([                 
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        CategoriePlat.aggregatePaginate(cursor, options)
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
                    app.post(prefixBackOffice+'/search-categorieplats/:page?/:orderby?/:order?', async (req, res) =>{        
                        
  
                        var p = 1;
                        var orderby = "libelle";
                        var order = 1;
                        var critere = {};
                        if(req.body.libelle!=null && req.body.libelle !== "") critere["libelle"] = {}, critere["libelle"]["$regex"] = req.body.libelle, critere["libelle"]["$options"] = "i";                      
                        
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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = CategoriePlat.aggregate([
                            {
                                $match: critere
                            },
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        CategoriePlat.aggregatePaginate(cursor, options)
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
                    app.get(prefixBackOffice+'/get-categorieplat/:id', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        const cursor = await CategoriePlat.find(
                            {
                                _id: mongoose.Types.ObjectId(req.params.id)
                            })
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
    app.get(prefixBackOffice+'/categorieplat/update/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
        const cursor = await CategoriePlat.findOne(
            {
                _id: mongoose.Types.ObjectId(req.params.id)
            })
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
  
    /****CRUD CATEGORIE PLAT END */    
  
    
  
  
    
  
  


////****CRUD VILLE START */    

                    ////***TEMPLATE DELETE */
                    app.delete(prefixBackOffice+'/ville/:id', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        await Ville.findByIdAndDelete(
                            req.params.id
                        )
                        .then(result => {
                            console.log(result);
                            console.log("ville delete");
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
                    app.put(prefixBackOffice+'/ville/update', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        console.log(req.body.id);
                        console.log(req.body.libelle);
                        await Ville.findByIdAndUpdate(req.body.id, 
                            {        libelle : req.body.libelle  })
                            .then(results =>{
                                console.log(results);
                                console.log("ville modifier");
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
                    app.post(prefixBackOffice+'/ville/create', async (req, res) => {
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                        
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
                        var newVille = new Ville();
                        newVille.libelle = req.body.libelle;        
                
                
                        await newVille.save()
                        .then(result =>{
                            console.log(result);
                            console.log("ville enregistrer");
                            var send = {
                                status: 200,
                                message: "success",
                                data: result
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                    });       
                
                    ////***TEMPLATE FINDALL INI */
                    app.get(prefixBackOffice+'/get-villes', async (req, res) =>{                                
                        var p = 1;
                        var orderby = "libelle";
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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = Ville.aggregate([
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Ville.aggregatePaginate(cursor, options)
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
                    app.post(prefixBackOffice+'/search-villes/:page?/:orderby?/:order?', async (req, res) =>{        
                        

                        var p = 1;
                        var orderby = "libelle";
                        var order = 1;
                        var critere = {};
                        if(req.body.libelle!=null && req.body.libelle !== "") critere["libelle"] = {}, critere["libelle"]["$regex"] = req.body.libelle, critere["libelle"]["$options"] = "i";

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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = Ville.aggregate([
                            {
                                $match: critere
                            },
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Ville.aggregatePaginate(cursor, options)
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
                    app.get(prefixBackOffice+'/get-ville/:id', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        const cursor = await Ville.find(
                            {
                                _id: mongoose.Types.ObjectId(req.params.id)
                            })
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
    app.get(prefixBackOffice+'/ville/update/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        const cursor = await Ville.findOne(
            {
                _id: mongoose.Types.ObjectId(req.params.id)
            })
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

    /****CRUD VILLE END */

    ////****CRUD ROLE START */    

                    ////***TEMPLATE DELETE */
                    app.delete(prefixBackOffice+'/role/:id', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        await Role.findByIdAndDelete(
                            req.params.id
                        )
                        .then(result => {
                            console.log(result);
                            console.log("role delete");
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
                    app.put(prefixBackOffice+'/role/update', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        console.log(req.body.id);
                        console.log(req.body.libelle);
                        console.log(req.body.valeur);
                        await Role.findByIdAndUpdate(req.body.id, 
                            {        libelle : req.body.libelle,   
                                valeur : parseInt(req.body.valeur)  })
                            .then(results =>{
                                console.log(results);
                                console.log("role modifier");
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
                    app.post(prefixBackOffice+'/role/create', async (req, res) => {
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                        
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
                        var newRole = new Role();
                        newRole.libelle = req.body.libelle;   
                        newRole.valeur = parseInt(req.body.valeur);     
                
                
                        await newRole.save()
                        .then(result =>{
                            console.log(result);
                            console.log("role enregistrer");
                            var send = {
                                status: 200,
                                message: "success",
                                data: result
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                    });       
                
                    ////***TEMPLATE FINDALL INI */
                    app.get(prefixBackOffice+'/get-roles', async (req, res) =>{                                
                        var p = 1;
                        var orderby = "libelle";
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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = Role.aggregate([
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Role.aggregatePaginate(cursor, options)
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
                    app.post(prefixBackOffice+'/search-roles/:page?/:orderby?/:order?', async (req, res) =>{        
                        

                        var p = 1;
                        var orderby = "libelle";
                        var order = 1;
                        var critere = {};
                        if(req.body.libelle!=null && req.body.libelle !== "") critere["libelle"] = {}, critere["libelle"]["$regex"] = req.body.libelle, critere["libelle"]["$options"] = "i";

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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var cursor = Role.aggregate([
                            {
                                $match: critere
                            },
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Role.aggregatePaginate(cursor, options)
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
                    app.get(prefixBackOffice+'/get-role/:id', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        const cursor = await Role.find(
                            {
                                _id: mongoose.Types.ObjectId(req.params.id)
                            })
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
    app.get(prefixBackOffice+'/role/update/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        const cursor = await Role.findOne(
            {
                _id: mongoose.Types.ObjectId(req.params.id)
            })
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

    /****CRUD ROLE END */

    //****CRUD RESTO START */

                ////***TEMPLATE REMOVE FROM ARRAY */
                app.put(prefixBackOffice+'/resto/removeuser', async (req, res) =>{
                    console.log('Auth '+req.header('authorization'));
                    var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
            
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
                    var restoUpdate = {};                    
                        var removeUser = {};
                        removeUser = {
                            'users': {
                                user: mongoose.Types.ObjectId(req.body.removeUser)
                            }
                        };
                        restoUpdate['$pull'] = removeUser;                        
                    console.log(restoUpdate);
                    await Resto.findByIdAndUpdate(req.body.id, 
                        restoUpdate)
                        .then(results =>{
                            console.log(results);
                            console.log("resto modifier");
                            var send = {
                                status: 200,
                                message: "success",
                                data: []
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                });    

                    ////***TEMPLATE DELETE */
                    app.delete(prefixBackOffice+'/resto/:id', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        await Resto.findByIdAndDelete(
                            req.params.id
                        )
                        .then(result => {
                            console.log(result);
                            console.log("resto delete");
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
                    app.put(prefixBackOffice+'/resto/update', async (req, res) =>{
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var restoUpdate = {};
                        restoUpdate['nom'] = req.body.nom;
                        restoUpdate['adresse'] = req.body.adresse;
                        //console.log(req.body.ville);
                        restoUpdate['ville'] = mongoose.Types.ObjectId(req.body.ville);
                        restoUpdate['contact'] = req.body.contact;
                        if(req.body.addUser!=null && req.body.addUser !== ""){                            
                            var addUser = {};
                            addUser = {
                                users:{
                                    "user": mongoose.Types.ObjectId(req.body.addUser),
                                    "etat": 0
                                }
                            };
                            restoUpdate['$push'] = addUser;
                        }                        
                        console.log(restoUpdate);
                        await Resto.findByIdAndUpdate(req.body.id, 
                            restoUpdate)
                            .then(results =>{
                                console.log(results);
                                console.log("resto modifier");
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
                    app.post(prefixBackOffice+'/resto/create', async (req, res) => {
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                        
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
                        var newResto = new Resto();
                        newResto.nom = req.body.nom;   
                        newResto.adresse = req.body.adresse;     
                        newResto.ville = req.body.ville;   
                        newResto.contact = req.body.contact;    
                
                
                        await newResto.save()
                        .then(result =>{
                            console.log(result);
                            console.log("resto enregistrer");
                            var send = {
                                status: 200,
                                message: "success",
                                data: result
                            };
                            res.json(send);
                        })
                        .catch(console.error);
                    });       
                
                    ////***TEMPLATE FINDALL INI */
                    app.get(prefixBackOffice+'/get-restos', async (req, res) =>{        
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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var dataform = await service.getVilles();                        
                        var cursor = Resto.aggregate([
                            {
                                $lookup: {
                                    from: "villes",
                                    localField: "ville",
                                    foreignField: "_id",
                                    as: "ville"
                                }
                            },
                            {
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Resto.aggregatePaginate(cursor, options)
                        .then(results => {
                            results['sortBy'] = orderby;
                            results['order'] = order;
                            results['dataform'] = dataform;
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
                    app.post(prefixBackOffice+'/search-restos/:page?/:orderby?/:order?', async (req, res) =>{        
                        

                        var p = 1;
                        var orderby = "nom";
                        var order = 1;
                        var critere = {};
                        if(req.body.nom!=null && req.body.nom !== "") critere["nom"] = {}, critere["nom"]["$regex"] = req.body.nom, critere["nom"]["$options"] = "i";
                        if(req.body.adresse!=null && req.body.adresse !== "") critere["adresse"] = {}, critere["adresse"]["$regex"] = req.body.adresse, critere["adresse"]["$options"] = "i";
                        if(req.body.ville!=null && req.body.ville !== "") critere["ville"] = mongoose.Types.ObjectId(req.body.ville);

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
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var dataform = await service.getVilles();                        
                        var cursor = Resto.aggregate([
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
                                $sort: orderBy
                            }
                        ]);
                        //cursor.match({nom: "Rakoto"});
                        Resto.aggregatePaginate(cursor, options)
                        .then(results => {
                            results['sortBy'] = orderby;
                            results['order'] = order;
                            results['dataform'] = dataform;
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
                    app.get(prefixBackOffice+'/get-resto/:id', async (req, res) =>{        
                        console.log('Auth '+req.header('authorization'));
                        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
                
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
                        var dataform = await service.getUsersNotHaveResto();
                        const cursor = await Resto.aggregate([
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
                                    from: "users",
                                    localField: "users.user",
                                    foreignField: "_id",
                                    as: "users"
                                }	
                            },
                            {
                                $limit: 1
                            }
                        ])
                        .then(results => {
                            console.log(results);
                            console.log(dataform);
                            var send = {
                                status: 200,
                                message: "success",
                                data: results,
                                dataform: dataform
                            };
                            res.json(send);
                        })
                        .catch(error => console.error(error))            
                    });       
                    
    ////***TEMPLATE PAGE CREATE SI DATAFORM */
    app.get(prefixBackOffice+'/resto/create', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var dataform = await service.getVilles();
        var send = {
            status: 200,
            message: "success",
            data: dataform
        };
        res.json(send);                    
    });  

    ////***TEMPLATE PAGE UPDATE SI DATAFORM */
    app.get(prefixBackOffice+'/resto/update/:id', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var dataform = await service.getVilles();
        const cursor = await Resto.aggregate([
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

    /****CRUD RESTO END */

                //****CRUD USER START*/

                    ////***TEMPLATE DELETE */
    app.delete(prefixBackOffice+'/user/:id', async (req, res) =>{
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);
        
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

console.log(newUser);
        await newUser.save()
        .then(result =>{
            console.log(result);
            console.log("user enregistrer");
            var send = {
                status: 200,
                message: "success",
                data: result
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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var dataform = await service.dataForm();
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
            results['dataform'] = dataform;
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
        if(req.body.ville!=null && req.body.ville !== "") critere["ville"] =  mongoose.Types.ObjectId(req.body.ville);
        if(req.body.role!=null && req.body.role !== "") critere["role"] = mongoose.Types.ObjectId(req.body.role);
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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var dataform = await service.dataForm();
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
            results['dataform'] = dataform;
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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
        var denied = await service.checkAuth(req.header('authorization'), access_backoffice, 1);

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
/****CRUD USER END */


                //**LOG BACK START*/
                app.post(prefixBackOffice+'/login', (req, res) => {
                    console.log(req.body.email +"/"+req.body.mdp);
                    console.log("ORIGIN: "+req.body.origin);
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
                        service.saveToken(result, token, req.body.origin);
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

    app.get(prefixBackOffice+'/signout/:origin', async (req, res) =>{        
        console.log('Auth '+req.header('authorization'));
        var denied = await service.checkAuth(req.header('authorization'), [], req.params.origin);

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




