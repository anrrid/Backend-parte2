/**
 * Required External Modules
 */
import 'dotenv/config'
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { messageDao, usersDao } from "./src/daos/index.js"
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./src/utils/config.js";
import passport from "passport";
import { Strategy as StrategyFb } from "passport-facebook";
import { Strategy } from "passport-local";
import { profile } from "console";
import router from "./auth.js"
import parseArgs from "minimist";


const LocalStrategy = Strategy;
const FacebookStrategy = StrategyFb
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const args = parseArgs(process.argv.slice(2));
const PORT = args.port || 8080;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }; 


/**
 *  App Configuration
 */

passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
        usersDao.findById(email)
            .then(user => {
                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }
                if (user.password !== password) {
                    return done(null, false, { message: "Incorrect password." });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongodb.url, mongoOptions: advancedOptions }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 10 }
}));

app.use(passport.initialize());
app.use(passport.session());

io.on("connection", async (socket) => {
    console.log("Usuario conectado con id: " + socket.id);

    socket.emit("messages", await messageDao.listarTabla());
    console.log(await messageDao.listarTabla());
    socket.on("new-message", async (message) => {

        await messageDao.insertarArticulo(message, "messages");
        socket.emit("messages", await messageDao.listarTabla());
    });
});

// Router mounting
app.use("/", router);

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor activado en el Puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});
