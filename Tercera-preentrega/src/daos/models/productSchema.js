import { Schema, model } from 'mongoose';

const productCollection = 'products';

//SCHEMA
const productSchema = new Schema({
        author: {
            title: {type: String, require: true},
            price: {type: Number, require: true},
            thumbnail: {type: String, require: true},
            timestamp: {type: String, require: true},
            description: {type: String, require: true},
            stock: {type: Number, require: true},
        },
        text: {type: String, require: true},
        date: {type: String, require: true},
        hour: {type: String, require: true}
    


});


const productModel = model(productCollection, productSchema);

export default productModel;