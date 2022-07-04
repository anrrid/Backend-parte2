const express = require('express');
const { Router } = express
const contenedor = require('../controllers/containerProd.js');
const prods = new Router();
const errObj = { error: 'Producto no encontrado' };
const err401 = { error: 'No estás autorizado para acceder a ésta URL' }

const admin = true;
// const contenedor = new Contenedor ();


prods.get('/', async (req, res) => {
    const objetos = await contenedor.getProds()
    res.json(objetos)
});


prods.post('/', async (req, res) => {
    const a = req.body
    const add = await contenedor.saveProd(a)

    if (admin != true) {
        res.send(err401)
    } else {
        res.send(add)
    }
})



module.exports = prods