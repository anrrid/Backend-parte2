class Product {

    productList = []

    createProduct = (product) => {
        return this.productList.push(product);
    }

    showProducts = () => {
        return this.productList;
    }
}

export default Product;