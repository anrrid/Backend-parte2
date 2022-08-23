import pkg from 'mongoose';
const { Schema, model } = pkg;

import cartSquema from './cartSchema.js'

const userCollection = 'users';

//SCHEMA
const userSchema = new Schema({
    name: { type: String, required: true, max: 40 },
    lastname: { type: String, required: true, max: 40 },
    age: { type: String, required: true, max: 40 },
    number: { type: String, required: true, max: 40 },
    address: { type: String, required: true, max: 40 },
    email: { type: String, required: true, max: 40 },
    avatar: { type: String, required: true, max: 40 },
    password: { type: String, required: true, max: 40 },
    cart: [cartSquema],
});


const userModel = model(userCollection, userSchema);

export default userModel;