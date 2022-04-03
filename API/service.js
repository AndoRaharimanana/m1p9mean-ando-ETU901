var crypto = require('crypto');
const { Users, Session, Ville, Role } = require("./model");
function crypt(string){
    return crypto.createHash('md5').update(string).digest('hex');
}

function createToken(user){
    var s = user.id+Date.now().toString()+(Math.floor(Math.random*10) + 1);
    return crypto.createHash('md5').update(s).digest('hex');
}

function saveToken(user, token){
    var newSession = new Session();
    newSession.user = user.id;
    newSession.valeur = token;
    newSession.etat = 0;

    newSession.save()
    .then(result =>{
        console.log(result);
        console.log("token enregistrer");
    })
    .catch(console.error);
}

async function checkAuth(token){            
    return await Session.findOne({
        $and:[
            {
                valeur: token
            },
            {
                etat: 0
            }                
        ]
    })
    .then(result =>{ 
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