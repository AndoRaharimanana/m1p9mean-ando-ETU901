const mongoose = require('mongoose');
  
const userSchema = new mongoose.Schema({
    _id: Number,
    nom: String,
    prenom: String,
    email: String,
    contact: String,
    adresse: String,
    ville: Number,
    mdp: String,
    sexe: String,
    role: Number
});

const sessionSchema = new mongoose.Schema({
    _id: Number,    
    user: Number,
    valeur: String,
    daty: Date,
    etat: Number
});

const Users = new mongoose.model('users', userSchema);
const Session = new mongoose.model('session', sessionSchema);
  
module.exports = { Users, Session};