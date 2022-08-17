/* Rutas de Autenticación, Autorización y Registro */

/* Requiero controladores de ruta */
import { signUpLocal, signUpLocalCallback, logIn, logInCallback, logOut } from "../controller/auth.js";

/*Requiero el controlador de autenticación por si la persona quiere loguearse vía Facebook: Funcionalidad pausada, ahora es  vía PassportLocal */
import { authenticate } from "../auth/authPassportFacebook";

export default (router) => {
  router
    /*------------------------ */
    /*Rutas para passportLocal */
    // Rutas de registro
    .post("/api/signup", signUpLocal, signUpLocalCallback)
    .get("/failsignup", (req, res, next) => {
      res.status(400).redirect("/error-signup");
    })
    // Rutas de login
    .post("/api/login", logIn, logInCallback)
    .get("/faillogin", (req, res, next) => {
      res.status(400).redirect("/error-login");
    })
  
    /*------------------------ */
    /*Rutas para deslogueo */
    .post("/api/logout", logOut);

  return router;
};
