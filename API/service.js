var crypto = require('crypto');
const mongoose = require('mongoose');
const { Users, Session, Ville, Role, CategoriePlat, Plat } = require("./model");
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

async function getUsersNotHaveResto(){
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
				restos:{
					$eq: []
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

