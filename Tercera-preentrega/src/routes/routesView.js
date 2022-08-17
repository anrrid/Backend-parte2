/*Requiero controladores de productos */
import productContainer from "../daos/services/productContainer.js";
const product = new productContainer();

/*Controladores de Auth */
import { checkAuthentication } from "../auth/checkAuth.js";

/*Controladores de Productos */
import { getAll, getByPrice } from "../controller/product.js";

/*Controladores de Mensajes de chat */
import { getAllMessages } from "../controller/messages.js";

/*Controlador carrito */
import { getCartSession } from "../controller/cart.js";

/*Controlador signup*/
import { signUp } from "../controller/singUp.js";

export default (router) => {
  router
    /*Ruta por defecto si no está logueado */
    .get("/", checkAuthentication, (req, res, next) => {
      res.render("./pages/login");
    })

    /*Vistas de productos */
    .get("/productos/vista", checkAuthentication, getAll)
    .get("/productos/agregar", (req, res, next) => {
      res.render("./pages/agregar");
    })

    /*Vistas de busquedad de productos por precio */
    .get("/buscar/precio?", checkAuthentication, getByPrice)

    /*Vistas de carrito */
    .get("/carrito/vista", checkAuthentication, getCartSession)
    .get("/purchase-completed", (req, res, next) => {
      res.render("./pages/purchase-completed");
    })

    /*Vistas de chat */
    .get("/chat-view", checkAuthentication, getAllMessages)

    /*Vistas de autenticación */
    .get("/login", (req, res, next) => {
      res.render("./pages/login");
    })
    .get("/signup", signUp)

    /*Vistas de perfil y goodbye */
    .get("/welcome", checkAuthentication, (req, res, next) => {
      const data = req.session.passport;
      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    /*Vista de errores */
    .get("/error-login", (req, res, next) => {
      res.render("./pages/error-login");
    })
    .get("/error-signup", (req, res, next) => {
      res.render("./pages/error-signup");
    });
  return router;
};
