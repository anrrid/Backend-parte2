export default class {

    addProductLocalStorage = (cart, localStorage) => {
        if (!localStorage.cartStorage){
            localStorage.cartStorage= cart;
            return localStorage.cartStorage;
        }
    }

    getProductsLocalStorage = (productsFromCart) => {
        if (!productsFromCart) {
            return "Products not found";
        } else {
            return productsFromCart
        }
    }
};