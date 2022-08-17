/*Requiero controladores de productos */
import { createProduct, getById, getAll, updateProduct, deleteById, getByTitle, getByCode, getByPrice, getByStock } from "../controller/product.js";

export default (router) => {
  router
    .post("/api/product/create", createProduct)
    .get("/api/product/:id", getById)
    .get("/api/product/", getAll)
    .patch("/api/product/update/:id", updateProduct)
    .delete("/api/product/delete/:id", deleteById)
    .get("/api/product/title/:title", getByTitle)
    .get("/api/product/code/:code", getByCode)
    .post("/api/product/price/search", getByPrice)
    .get("/api/product/stock/search", getByStock);

  return router;
};
