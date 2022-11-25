const http = require('http');
const express = require('express');
const Container = require('./contenedor')
const servidor = express();
const PORT = 8000;

servidor.use(express.json());


servidor.get("/api/products", (peticion, respuesta) => {
    const container = new Container();
    const file = "./products.txt";
    const allProductsArray = container.read(file);
    respuesta.json(allProductsArray);
});


servidor.get("/api/product/:id", (peticion, respuesta) => {
    const { id } = peticion.params
    const container = new Container();
    const file = "./products.txt";
    const allProductsArray = container.read(file);
    respuesta.json({ buscada: allProductsArray[parseInt(id) - 1] })
});

servidor.post('/api/products', (peticion, respuesta) => {
    const { nombre, cantidad, precio } = peticion.body;
    const nuevoProducto = { nombre, cantidad, precio };
    const products = new Container();
    const product = products.save(nuevoProducto);
    respuesta.json({ agregada: nuevoProducto, posicion: products.length })
});

servidor.put('/api/products/:id', (peticion, respuesta) => {
    const { product } = peticion.body
    const { id } = peticion.params
    const productAnt = products[parseInt(id) - 1]
    products[parseInt(id) - 1] = product
    respuesta.json({ actualizada: product, anterior: productAnt })
});


servidor.delete('/api/products/:id', (peticion, respuesta) => {
    const { id } = peticion.params
    const [product] = products.splice(parseInt(id) - 1, 1)
    respuesta.json({ borrada: product })
});



servidor.listen(8000);
console.log("Servidor corriendo en el puerto " + PORT);
