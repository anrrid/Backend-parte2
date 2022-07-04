const mongoose = require('mongoose');

const models = require('../models/users.js');


mongoose.connect('mongodb+srv://tobyceballos:coderhouse@cluster0.erpbj.mongodb.net/Cluster0?retryWrites=true&w=majority')



class Container {
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
        const get = await this.collection.find()
        return get
    }
};


const user = new Container()
module.exports = user;