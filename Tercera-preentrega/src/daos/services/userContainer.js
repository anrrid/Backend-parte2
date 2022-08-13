import userModel from '../models/userSchema.js'

export default class {
    async addCart(id, cart) {
        await userModel.updateOne(id, {
            $push: {cart: cart },
        })
    }
}