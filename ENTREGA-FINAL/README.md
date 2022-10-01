<h1 align="center">Proyecto Final</h1>
<h2 align="center">Mi Tienda</h2>
<p>En el proyecto "Mi Tienda" el usuario podra comprar. Primero debera registrarse para poder agregar productos al carrito. Tambien cuenta con centro de mensajes donde se podra dejar consultas.
</p>

## 🌐 [Ver Proyecto en Heroku]

## Instalar dependencias
npm install

## Dependencias utilizadas
bcrypt/ body-parser/compression
connect-mongo/dotenv/ejs/express/express-session/minimist/mongoose
nodemailer/nodemon/passport/passport-local/pino/socket.io/twilio


## Iniciar el servidor
npm run start

## Visualización proyecto
A fin de visualizar el proyecto, registrarse o ingresar con usuario de prueba, previamente registrado:
email: prueba@prueba.com password: 123


## Routes
### Productos
- `GET /productos` Retorna un JSON con todos los productos.
- `POST /productos` Recibe un producto, lo guarda en la base de datos y lo retorna.
- `GET /productos/:id` Recibe un id a través de la ruta y retorna el producto con ese id si este se encuentra.
- `PUT /productos/:id` Recibe un id a través de la ruta, además del nuevo producto para actualizar en el cuerpo, si se encuentra el id 
pasado se actualiza y por último se retorna el nuevo.
- `DELETE /productos/:id` Recibe un id a través de la ruta y si encuentra un producto con ese id lo elimina.
- `GET /productos/categoria/:categoria` Recibe el nombre de una categoría a través de la ruta y retorna todos los productos que pertenecen
a esa categoría encontrados.

### Chat
- `GET /chat` Retorna un render de la sección de chat.
- `GET /chat/:email` Recibe un email a través de la ruta y retorna un render de todos los mensajes que pertenecen al email pasado.

### Carrito
- `GET /carrito` Retorna un render del carrito del usuario. Se debe estar logueado para ingresar.
- `GET /carrito/productos` Retorna los productos actuales del carrito.
- `POST /carrito/productos` Recibe un producto en el cuerpo de la petición y agrega el producto al carrito o incrementa su cantidad en uno
si es que este ya estaba. Se debe estar logueado para realizar esta operación.
- `DELETE /carrito/productos/:id` Recibe un id de producto a través de la ruta y lo elimina del carrito del usuario. 
Se debe estar logueado para realizar esta operación.
- `POST /carrito/compra` Envía los mensajes de confirmación de pedido y limpia el carrito del usuario. 

### Ordenes
- `GET /orden` Retorna un JSON con la información de las ordenes realizadas por el usuario. Se debe estar logueado para realizar esta operación.
- `POST /orden` Se guarda una nueva orden del usuario en la base de datos con los productos actuales del carrito. Se debe estar logueado para realizar esta operación.

### Autenticación
- `GET /login` Retorna un render de la sección de login y registro.
- `GET /logout` Si se está logueado a una cuenta, se desloguea de esta y se redirecciona a la página principal.
- `POST /auth/login` Recibe un email y contraseña en el cuerpo de la petición y te redirecciona a la página principal si estos son correctos.
- `POST /auth/signup` Recibe toda la información para un nuevo usuario y lo guarda en la base de datos, además de generar un carrito nuevo para él, y por último
te redirecciona a la página principal ya logueado.

### Process
- `GET /info` Retorna un JSON con información acerca del servidor.
- `GET /api/randoms?cant` Se le puede pasar un número a través de la ruta y este retorna un JSON con números al azar entre 1 y 1000, y la cantidad de veces
que tocaron. Si no se pasa un valor para cant este es 1000 por defecto.

## 🏠 [Homepage]

