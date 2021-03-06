/**
 * Required External Modules
 */
import 'dotenv/config'
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { messageDao, usersDao } from "./src/daos/index.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./src/utils/config.js";
import passport from "passport";
import { Strategy } from "passport-local";
import router from "./auth.js"
import cluster from 'cluster';
import * as os from 'os';
import { logger } from './src/utils/logger.js';

const clusterMode = process.argv[3] == 'CLUSTER';

if (clusterMode && cluster.isPrimary) {
    const CPUcores = os.cpus().length;
    console.log(`Primary cluster setting up ${CPUcores} workers`);

    for (let i = 0; i < CPUcores; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else{
    const app = express();
    const PORT = parseInt(process.argv[2]) || 8080;
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);
    const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }; 

    try {
        
        const LocalStrategy = Strategy;
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
    } catch (error) {
        done(error),
        logger('error', error)
    }

    app.use(session({
        store: MongoStore.create({ mongoUrl: config.mongodb.url, mongoOptions: advancedOptions }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 10 }
    }));

    /**
 *  App Configuration
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.set('view engine', 'ejs');

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

//LOGGER
app.get('*', (req, res) => {
    logger('warn', "Page not found");
    res.status(404).send('404 Not Found');
})

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor activado en el Puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});

}

/* ----------------------------------- DEBUG ---------------------------------*/

//node --inspect server.js
//chrome:/inspect

//PASOS
//LEVANTE DEL SERVIDOR
//node --prof server.js

//Emule las conexiones con las request 
//artillery quick --count 50 -n 20 http://localhost:8080/info > artillery_slow.txt

//LUEGO PASE ESTA LINEA DE COMANDO 
//node --prof-process isolate-000002BADFFB5440-8740-v8.log > artillery_slow.txt 

//NOTAS
//cambie el nombre x el de mi archivo isolate generado, yaque no me permite modificarlo. Pero me da un error: EBUSY: resource busy or locked, open 'isolate-000002BADFFB5440-8740-v8.log' 

//AUTOCANNON 0x
// curl -X GET "http://localhost:8080/info"