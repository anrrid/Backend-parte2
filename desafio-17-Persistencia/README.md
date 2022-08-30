# Arquitectura en capas

## Instalar dependencias
$ npm install

## ✨Iniciar el servidor con los diferentes modos de persistencia

$ npm start # --> Por defecto con MongoDB
$ PERSISTENCIA=memory node index.js # --> memoria


# Alternativamente se puede usar con nodemon, con los comandos:
$ npm run dev # --> Por defecto con MongoDB
$ npm run dev:firebase # --> firebase
$ npm run dev:memory # --> memoria


- Implementación del patrón Repository sobre los DAOs de Mensaje y Productos
- Reimplementación de las rutas de productos para pruebas


