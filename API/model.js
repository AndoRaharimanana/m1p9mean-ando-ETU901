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
    etat: Number,
    origin: Number
});

const villeSchema = new mongoose.Schema({
    libelle: String
});

villeSchema.plugin(aggregatePaginate);

const roleSchema = new mongoose.Schema({ 
    libelle: String,
    valeur: Number
});

roleSchema.plugin(aggregatePaginate);

const restoSchema = new mongoose.Schema({ 
    nom: String,
    adresse: String,
    ville: mongoose.Schema.Types.ObjectId,
    contact: String,
    users:[],
    plats: [],
    info: {},
    platsinfo: {}
});


restoSchema.plugin(aggregatePaginate);

const categoriePlatSchema = new mongoose.Schema({
    libelle: String
});

categoriePlatSchema.plugin(aggregatePaginate);

const platSchema = new mongoose.Schema({ 
    libelle: String,
    categorie: mongoose.Schema.Types.ObjectId,
    createur: mongoose.Schema.Types.ObjectId,
    description: String,
    recette: String,
    images:[]
});

platSchema.plugin(aggregatePaginate);

const commandeSchema = new mongoose.Schema({ 
    client: mongoose.Schema.Types.ObjectId,
    livreur: mongoose.Schema.Types.ObjectId,
    daty: Date,
    plats: [],
    etat: Number
});

commandeSchema.plugin(aggregatePaginate);

const Users = new mongoose.model('users', userSchema);
const Session = new mongoose.model('sessions', sessionSchema);
const Ville = new mongoose.model('villes', villeSchema);
const Role = new mongoose.model('roles', roleSchema);
const Resto = new mongoose.model('restos', restoSchema);
const CategoriePlat = new mongoose.model('categoriePlats', categoriePlatSchema);
const Plat = new mongoose.model('plats', platSchema);
const Commande = new mongoose.model('commandes', commandeSchema);
  
module.exports = { Users, Session, Ville, Role, Resto, CategoriePlat, Plat};