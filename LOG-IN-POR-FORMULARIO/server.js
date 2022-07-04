const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const session = require('express-session')
const MongoStore = require ("connect-mongo");
const cookieParser = require ("cookie-parser");

const ContainerMsg = require('./src/controllers/containerMsg.js')
const ContainerProds = require('./src/controllers/containerProd.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//SESSION
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.ijjaz.mongodb.net/Cluster0?retryWrites=true&w=majority', mongoOptions: advancedOptions, ttl: 600 }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 10 }
}))


//VIEWS
app.use(express.static('./src/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//AUTHENTICATED FC
app.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.email) {
            return true
        }

        return false
    }
    req.logout = done => {
        req.session.destroy(done)
    }
    next()
})

//Verify Authentication

app.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.email) {
            return true
        }
        return false
    }
    req.logout = done => {
        req.session.destroy(done)
    }
    next()
})

//ROUTES

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/data')
    }
    res.render('login')
})



//SOCKETS
io.on('connection', async (sockets) => {
    const product = await ContainerProds.getProds()
    sockets.emit('product', await ContainerProds.getProds())
    console.log('Un cliente se ha conectado!: ' + sockets.id)
    console.log('test ' + sockets.id)

    console.log(product, 'product');

    sockets.emit('messages', await ContainerMsg.getMsg())
   
    sockets.on('new-product', async data => {
        await ContainerProds.saveProd(data)
        console.log(data, 'new-product')
        
        io.sockets.emit('product', await ContainerProds.getProds())
    })
    sockets.on('new-message', async dato => {

        await ContainerMsg.saveMsj(dato)
        console.log(dato, 'dato')

        io.sockets.emit('messages', await ContainerMsg.getMsg())
    })
})

//SESSION
function auth(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

//inicia en login
app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/home", auth, (req, res) => {
    res.render(__dirname + "/views/index.ejs", {
        name: req.session.user
   });
});

app.post("/login", (req, res) => {
    req.session.user = req.body.name;
    res.redirect('/home');
});

app.get("/logout", auth, (req, res) => {
    res.render( __dirname + "/views/logout.ejs", {
        name: req.session.user
    });
    req.session.destroy();
});

const PORT = 8080
httpServer.listen(PORT, () => console.log('Server on: ' + PORT))