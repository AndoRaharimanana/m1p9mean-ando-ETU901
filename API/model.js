const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
//var aggregatePaginate = require("mongoose-aggregate-paginate");

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    contact: String,
    adresse: String,
    ville: mongoose.Schema.Types.ObjectId,
    mdp: String,
    sexe: String,
    role: mongoose.Schema.Types.ObjectId
});

userSchema.plugin(aggregatePaginate);

const sessionSchema = new mongoose.Schema({  
    user: mongoose.Schema.Types.ObjectId,
    valeur: String,
    daty: Date,
    etat: Number
});

const villeSchema = new mongoose.Schema({
    libelle: String
});

const roleSchema = new mongoose.Schema({ 
    libelle: String,
    valeur: Number
});

const Users = new mongoose.model('users', userSchema);
const Session = new mongoose.model('sessions', sessionSchema);
const Ville = new mongoose.model('villes', villeSchema);
const Role = new mongoose.model('roles', roleSchema);
  
module.exports = { Users, Session, Ville, Role};