/*SERVER */
import express, { Router} from "express";
/*EXPRESS */
const app = express();
/*CONSTANTE */
const http = require("http").Server(app);

/*HTTP */
const io = require("socket.io")(http);

/*MODULO HANDLEBARS */
import handlebars from "express-handlebars";

/*CORS */
import cors from "cors";
app.use(cors());

/*COMPRESSION*/
import compression from "compression";
app.use(compression());

/*MULTER*/
import multer, { diskStorage } from "multer";
const storageMulter = diskStorage({
  destination: "public/avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage: storageMulter,
    dest: "public/avatar",
  }).single("avatar")
);

/*PASSPORT */
import { initialize, session as _session } from "passport";
/*SESSO*/
import session from "express-session";
/*COOKIE-PARSER */
import cookieParser from "cookie-parser";
/*MONGO STORE */
import { create } from "connect-mongo";
/*MONGO ATLAS */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/*MONGO STORE */
app.use(
  session({
    store: create({
      mongoUrl:
        "mongodb+srv://guillesapag:mercyful69@cluster0.eh9yf.mongodb.net/baseterror?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "Soy un gran secreto",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 180000,
    },
  })
);
app.use(cookieParser());

/*Middleware Passport:  ANTES QUE LAS RUTAS */
app.use(initialize());
app.use(_session());

/*Router */
/*Se requieren las  rutas que va a ofrecer nuestra aplicación */
import routesProducts from "./src/routes/routesProducts";
const routerProducts = Router();
import routesCart from "./src/routes/routesCart";
const routerCart = Router();
import routesMessagesChat from "./src/routes/routesMessagesChat";
const routerMessagesChat = Router();
import routesAuth from "./src/routes/routesAuth";
const routerAuth = Router();
import routesProcessInfo from "./src/routes/routesProcessInfo";
const routerProcessInfo = Router();
import routesRandom from "./src/routes/routesRandom";
const routerRandom = Router();

/*Rutas a las view */
import routesView from "./src/routes/routesView";
const routerViews = Router();

/*Rutas a las view via IO */
import routesIoChat from "./src/routes/routesIOChat";
const routerIoChat = Router();

/*Body Parser: YA NO SE USA */
import { json, urlencoded } from "body-parser";
// /*Uso de Middlewares*/
app.use(json());
app.use(urlencoded());
// app.use(express.json()); // Por algun motivo extraño el express.json() no me estaría funcionando

/*Configuración del motor de plantilla*/
app.engine(
  "hbs",
  handlebars({
    extname: "hbs", // Extension a utilizar
    defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/`, // Donde se van a encontrar los partials
  })
);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

/*Sirve para ofrecer archivos staticos, ej:
http://localhost:8080/static/css/style.css
http://localhost:8080/static/js/index.js
*/
// Utilizamos el prefijo virtual '/static'
app.use("/static", (__dirname + "/public"));

/*Rutas del API: Productos*/
app.use(routesProducts(routerProducts));
/*Rutas del API: Cart*/
app.use(routesCart(routerCart));
/*Rutas del API: Mensaje de chat*/
app.use(routesMessagesChat(routerMessagesChat));
/*Rutas del API: Ruta de session*/
app.use(routesAuth(routerAuth));
/*Rutas IO chat*/
app.use(routesIoChat(routerIoChat));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));
/*Rutas de ProcessInfo */
app.use(routesProcessInfo(routerProcessInfo));
/*Rutas de Random */
app.use(routesRandom(routerRandom));

/*Socket.io: Chat */
/* Funcion socketIo que lo que contiene adentro es toda la conexión IO. */
import socketConnection from "./src/services/messagesIOchat";
socketConnection(io);

/*Exportamos servidor */
export default http;
