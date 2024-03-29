import { faker } from '@faker-js/faker'
import ProductRepo from '../persistencia/Modelos/DAOs/Repositories/ProductsRepo.js'

const products = new ProductRepo()

export const generateMockProducts = (cant) => {
    const fakeProducts = []
    for(let i=0; i<cant; i++){
        fakeProducts.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        })
    }
    return fakeProducts
}
export const fetchProducts = async (id) => {
    if(id) {
        return await products.getById(id)
    } else {
        return await products.getAll()
    }
}
export const addProduct = async (productData) => {
    const addedProduct = await products.add(productData)
    const allProducts = await products.getAll()
    return {
        created: addedProduct,
        products: allProducts
    }
}
export const updateProduct = async (id, productData) => {
    if(id === null || id === undefined) throw new Error('Id is required to edit')
    const editedProduct = await products.updateById(id, productData)
    const allProducts = await products.getAll()
    return {
        edited: editedProduct,
        products: allProducts
    }
}
export const removeProduct = async (id) => {
    if(id === null || id === undefined) throw new Error('Id is required to delete')
    await products.deleteById(id)
    return {
        message: `Deleted product with id: ${id}`
    }
}

export const getAllProducts = async () => {
    await products.getAll()
}
