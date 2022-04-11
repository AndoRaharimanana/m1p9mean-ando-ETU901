var crypto = require('crypto');
const mongoose = require('mongoose');
const { Users, Session, Ville, Role, CategoriePlat, Plat, Resto, Commande } = require("./model");
function crypt(string){
    return crypto.createHash('md5').update(string).digest('hex');
}

function createToken(user){
    var s = user.id+Date.now().toString()+(Math.floor(Math.random*10) + 1);
    return crypto.createHash('md5').update(s).digest('hex');
}

function saveToken(user, token, origin){
    var newSession = new Session();
    newSession.user = user.id;
    newSession.valeur = token;
    newSession.etat = 0;
    newSession.origin = parseInt(origin);

    newSession.save()
    .then(result =>{
        console.log(result);
        console.log("token enregistrer");
    })
    .catch(console.error);
}

async function checkAuth(token, refuser, origin){  
    var cdt = {};
    cdt['valeur'] = token;
    cdt['etat'] = 0;
    return await Session.aggregate([
		{
            $match: cdt
        },
        {
			$lookup:{
				from: "users",
				localField: "user",
				foreignField: "_id",
				as: "u"
			}	
		},
		{
			$lookup:{
				from: "roles",
				localField: "u.role",
				foreignField: "_id",
				as: "role"
			}
		} 
    ])
    .then(result =>{ 
        console.log(result);
        console.log(refuser);
        console.log("result.length "+result.length);
        console.log("refuser.length "+refuser.length);        
        for(var i = 0; i<result.length; i++){
            if(origin != result[i].origin){
                return false;
            }
            for(var j = 0; j<refuser.length; j++){
                console.log("ref"+refuser[j] + " // role "+result[i].role[0].valeur );
                if(refuser[j] === result[i].role[0].valeur){
                    console.log("role refuse");
                    return false;
                }
            }
        }
        if(result === null){
            console.log("token non existant");
            return false;
        }else{
            console.log("token existant");
            return true;
        }
    })  
    .catch(console.error);  
}

async function checkAuthResto(token, resto, origin){  
    var cdt = {};
    cdt['valeur'] = token;
    cdt['etat'] = 0;
    console.log(resto);
    if(resto == null || resto == "null"){
        return false;
    }
    return await Session.aggregate([
		{
            $match: cdt
        },
		{
			$lookup:{
				from: "restos",
				localField: "user",
				foreignField: "users.user",
				as: "restos"
			}
		},
		{
			$match: {
			  "restos._id": mongoose.Types.ObjectId(resto)
			}
		 }
    ])
    .then(result =>{ 
        console.log(result);
        console.log("result.length "+result.length);
        for(var i = 0; i<result.length; i++){
            if(origin != result[i].origin){
                return false;
            }
        }
        if(result === null){
            console.log("token non existant");
            return false;
        }else{
            console.log("token existant");
            return true;
        }
    })  
    .catch(console.error);  
}

async function checkAuthRestoChoose(token, origin){  
    var cdt = {};
    cdt['valeur'] = token;
    cdt['etat'] = 0;
    return await Session.aggregate([
		{
            $match: cdt
        },
		{
			$lookup:{
				from: "restos",
				localField: "user",
				foreignField: "users.user",
				as: "restos"
			}
		},
		{
			$match:{
				restos:{
					$ne: []
				}
			}
		}
    ])
    .then(result =>{ 
        console.log(result);
        console.log("result.length "+result.length);
        for(var i = 0; i<result.length; i++){
            if(origin != result[i].origin){
                return null;
            }
        }
        if((result === null) || (result.length == 0)){
            console.log("token non existant");
            return null;
        }else{
            console.log("token existant");
            return result;
        }
    })  
    .catch(console.error);  
}

async function tokenExpire(token){
    await Session.findOneAndUpdate({valeur: token}, {etat: 1})
    .then(result =>{
        console.log("token expire");
    })
    .catch(console.error);
}


async function getVilles(){
    console.log("get villes");
    return await Ville.find()
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function getRestosRandom(size){
    console.log("get restos");
    return await Resto.aggregate(
        [
            {
                $sample: {
                    size: size
                }
            }
        ]
    )
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function getRoles(){
    console.log("get roles");
    return await Role.find().sort({valeur: 1})
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function getCategoriePlat(cdt){
    console.log("get categorieplat");    
    return await CategoriePlat.find(cdt)
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function getUsersNotHaveResto(resto){
    console.log("get users not have resto");
    return await Users.aggregate([
        {
            $lookup:{
				from: "restos",
				localField: "_id",
				foreignField: "users.user",
				as: "restos"                
            }
        },
        {
            $match:{
                        "restos._id":{
                            $ne: mongoose.Types.ObjectId(resto)
                        }
            }
        }
    ])
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function getUtilisateurByRole(role){
    console.log("get utilisateur by role");
    return await Users.aggregate([
        {
			$lookup:{
				from: "roles",
				localField: "role",
				foreignField: "_id",
				as: "role"
			}            
        },
        {
			$match:{
				role:{
					$elemMatch:{
						valeur: role,
					}
				}
			}
        }
    ])
    .then(results => {
        console.log(results);
        return results;
    })
    .catch(console.error);
}

async function dataForm(){
    console.log("data form");
    var villes = await getVilles();
    var roles = await getRoles();
        return new Object({
            ville: villes,
            role: roles
        });
}


async function getDetailPlat(restoid, cdt){    
    return Resto.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(restoid)
            }
        },        
        {
            $unwind: "$plats"
        },
        {
            $group:{
                _id:
                    "$plats"
            }
        },
        {
            $match:{
                "_id.daty":{
                    $lte: new Date()
                }
            }
        },
        {
            $sort:{
                "_id.daty": -1
            }
        },
        {
            $group:{
                _id: "$_id.plat",
                doc: {
                    $first: '$$ROOT'
                }
            },
        },
        {
            "$replaceRoot": {
                "newRoot": "$doc"
            }
        },
        {
            $project:{
                "info": "$_id"
            }
        },
{
    $lookup:{
        from: "plats",
        localField: "info.plat",
        foreignField: "_id",
        as: "platsinfo"
    }
},
{
    $unwind: "$platsinfo"
},
{
    $lookup:{
        from: "categorieplats",
        localField: "platsinfo.categorie",
        foreignField: "_id",
        as: "platsinfo.categorie"
    }
},
{
    $addFields: {
        info:{
            benefice:{
                    $subtract: ['$info.prixVente','$info.prixRevient']
            }
        },
        _id:{
            benefice:{
                    $subtract: ['$info.prixVente','$info.prixRevient']
            }
        }			
    }
}
   ,
        {
            $match:cdt
        }
    ])/*
    .then(results => {
        return results;
    })
    .catch(error => console.error(error))                */
}
async function getDetailPlatAll(cdt){    
    return Resto.aggregate([        
        {
            $unwind: "$plats"
        },
        {
            $group:{
                _id:
                    "$plats"
            }
        },
        {
            $match:{
                "_id.daty":{
                    $lte: new Date()
                }
            }
        },
        {
            $sort:{
                "_id.daty": -1
            }
        },
        {
            $group:{
                _id: "$_id.plat",
                doc: {
                    $first: '$$ROOT'
                }
            },
        },
        {
            "$replaceRoot": {
                "newRoot": "$doc"
            }
        },
        {
            $project:{
                "info": "$_id"
            }
        },
{
    $lookup:{
        from: "plats",
        localField: "info.plat",
        foreignField: "_id",
        as: "platsinfo"
    }
},
{
    $unwind: "$platsinfo"
},
{
    $lookup:{
        from: "categorieplats",
        localField: "platsinfo.categorie",
        foreignField: "_id",
        as: "platsinfo.categorie"
    }
} ,
{
    $match:{
        "info.etat":{
            $eq: 0
        }
    }
},
{
    $addFields: {
        info:{
            benefice:{
                    $subtract: ['$info.prixVente','$info.prixRevient']
            }
        },
        _id:{
            benefice:{
                    $subtract: ['$info.prixVente','$info.prixRevient']
            }
        }			
    }
}
   ,
        {
            $match:cdt
        }
    ])/*
    .then(results => {
        return results;
    })
    .catch(error => console.error(error))                */
}

async function getCommandeMax(user, daty){
    return Commande.aggregate([
        {
            $match: {
                $and:[
                    {
                        "client": {$eq: mongoose.Types.ObjectId(user)}
                    },
                    {
                        "daty":{
                            $lte: daty
                        }
                    }
                ]
            }
        },
        {
            $sort:{
                "daty": -1
            }
        },
        {
            $limit: 1
        }
    ])
}

async function getCommandeEnCours(user, daty){
    var commande = new Commande();
    var commandeMax = null;
    await this.getCommandeMax(user, daty)
    .then(results=>{
        commandeMax = results;
    })
    .catch(console.error);

    if((commandeMax == null) || (commandeMax!=null && commandeMax.etat != 0)){
        commande.client = mongoose.Types.ObjectId(user);
        commande.daty = new Date();
        commande.etat = 0;
        await commande.save()
        .then(result =>{
            commande = result;
        })
        .catch(console.error)
    }else{
        commande = commandeMax;
    }
    return commande;
}

async function ajouterPlat(plat, qte, commande){
    var cmd = {};
    var addPlat = {};
    addPlat = {
        plats:{
            "plat": mongoose.Types.ObjectId(plat),
            "qte": qte,
            "daty": new Date()
        }
    };
    cmd['$push'] = addPlat;
    return Commande.findByIdAndUpdate(commande,
        cmd)
        .then(results =>{
            return results
        })
        .catch(console.error);
}

function generateMdp(){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < charactersLength ; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;    
}


exports.crypt = crypt;
exports.createToken = createToken;
exports.saveToken = saveToken;
exports.checkAuth = checkAuth;
exports.tokenExpire = tokenExpire;
exports.getRoles = getRoles;
exports.getVilles = getVilles;
exports.dataForm = dataForm;
exports.getUtilisateurByRole = getUtilisateurByRole;
exports.getUsersNotHaveResto = getUsersNotHaveResto;
exports.checkAuthResto = checkAuthResto;
exports.checkAuthRestoChoose = checkAuthRestoChoose;
exports.getCategoriePlat = getCategoriePlat;
exports.getDetailPlat = getDetailPlat;
exports.getRestosRandom = getRestosRandom;
exports.getDetailPlatAll = getDetailPlatAll;
exports.generateMdp = generateMdp;

