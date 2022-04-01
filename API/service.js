var crypto = require('crypto');
const { Users, Session } = require("./model");
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

exports.crypt = crypt;
exports.createToken = createToken;
exports.saveToken = saveToken;