import { Schema, model } from 'mongoose';
import {productSchema} from './productSchema.js'

const cartCollection = 'cart';

//SCHEMA
const productOnCartSchema = new Schema({
        product: productSchema,
        quantity: {type: Number, default: 0}

});

const cartSchema = new Schema ({

    timestamp: {type: Date, default: new Date ()},
    productsOnCart: [productOnCartSchema]
});


const cartModel = model(cartCollection, cartSchema);

export default {cartModel, cartSchema};