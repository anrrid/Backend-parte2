import cartModel from '../models/cartSchema.js'
import Cart from '../models/cartScript.js'

const cartJs = new Cart();

export default class {

    async createCart(cart) {
        console.log("run createCart");

        cartJs.createCart(cart);
        return await cartModel.create(cart);
    }

    async getAllCarts(){
        console.log("run getAllCarts");
        console.log(cartJs.showCart());
        return await cartModel.find();
    }

    async getProductFromCart(id) {
        console.log("run getProductFromCart");
        return await cartModel.findById(id);
    }

    async deleteProductFromCart ({idCart, idProduct}) {
        console.log("run deleteProductFromCart");
        return await cartModel.findOneAndUpdate({_id: idCart}, {$pull: { product: {code: idProduct}}}
        );
    }

};

