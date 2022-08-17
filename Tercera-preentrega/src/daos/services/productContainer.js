import productModel from '../models/productSchema.js'
import Product from '../models/productScript.js'

const ProductJs = new Product();

export default class {

    async createProduct (product) {
        console.log(product, "run createProduct");
        ProductJs.createProduct(product);
        return await productModel.create(product)
    }

    async getProduct(id) {
        console.log("run getProduct");
        return await productModel.findById(id);
    }

    async getAllProducts() {
        return await productModel.find().lean();
    }

    async updateProducts(id, productUpdate) {
        console.log("run updateProducts");
        const findAndUpdateProduct = await productModel.findByIdAndUpdate(id, productUpdate, {new: true});
        return findAndUpdateProduct
    }

    async deleteProduct(id) {
        console.log("run deleteProduct");
        await productModel.findByIdAndDelete(id);
    }

    async getProductByTitle(title) {
        console.log("run getProductByTitle");
        return await productModel.find({title: title})
    }

    async getProductByCode(code) {
        console.log("run getProductByCode");
        return await productModel.find({code: code})
    }
    async getProductByPrice(min, max){
        return await productModel
        .find({
            $and: [{ price: { $gte: min}}, {price: { $lte: max}}]
        })
    }
    async getProductByStock(min, max) {
        console.log("run getProductByStock");
        return await productModel.find({
            $and: [{stock: {$gte: min}}, {stock: {$lte: max} }],
        });
    }
};
