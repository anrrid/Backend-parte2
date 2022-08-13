class Cart {
    cartContent = []

    createCart = (cart) => {
        return this.cartContent.push(cart);
    }

    showCart = () => {
        return this.cartContent;
    }
}

export default Cart;