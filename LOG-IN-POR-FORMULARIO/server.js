const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const session = require('express-session')

const ContainerMsg = require('./src/controllers/contenedorMsg.js')
const ContainerProds = require('./src/controllers/contenedorProd.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//SESSION
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


//VIEWS
app.use(express.static('./src/public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index.ejs', {root: __dirname})
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


const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))