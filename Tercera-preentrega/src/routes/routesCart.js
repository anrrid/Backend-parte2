/*Requiero controladores de productos */
import { getAllCarts, createCart, postCartSession, getCartSession, getProductOnCart, deleteProductOnCart } from "../controller/cart.js";

export default (router) => {
  router
    .get("/api/cart/", getAllCarts)
    .post("/api/cart/create", createCart)
    .post("/api/cart/post-session", postCartSession)
    .get("/api/cart/get-session", getCartSession)
    .get("/api/cart/search", getProductOnCart)
    .delete("/api/cart/delete/search", deleteProductOnCart)
    .post('/api/cart/test', (req,res,next) => {
      console.log(req.body)
    })
  return router;
};
