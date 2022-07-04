const mongoose = require('mongoose');

const models = require('../models/users.js');

mongoose.connect('mongodb+srv://tobyceballos:coderhouse@cluster0.erpbj.mongodb.net/Cluster0?retryWrites=true&w=majority')



class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveUser({user, email, password}){

        const newUser = {
            user: user,
            email: email,
            password: password,
        }

        const saved = await this.collection.insertMany(newUser)
        return saved
    };

    async getUsers(){
        const gets = await this.collection.find()
        return gets
    }
};


const user = new Contenedor()
module.exports = user;