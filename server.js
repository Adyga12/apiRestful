const http = require('http');
const express = require('express');
const Container = require('./contenedor')
const servidor = express();
const PORT = 8000;
let products = null;

servidor.use(express.json());

function onInit() {
    products = getAllProducts();
    console.log("Productos cargados: ", products);
}

servidor.get("/api/products", (peticion, respuesta) => {
    respuesta.send(products);
});

servidor.get("/api/product/:id", (peticion, respuesta) => {
    const { id } = peticion.params
    respuesta.json({ buscada: products[parseInt(id) - 1] })
});

servidor.post('/api/products', (peticion, respuesta) => {
    const { product } = peticion.body
    products.push(product)
    respuesta.json({ agregado: product, posicion: products.length })
})

servidor.put('/api/products/:id', (peticion, respuesta) => {
    const { product } = peticion.body
    const { id } = peticion.params
    const productAnt = products[parseInt(id) - 1]
    products[parseInt(id) - 1] = product
    respuesta.json({ actualizada: product, anterior: productAnt })
})


servidor.delete('/api/products/:id', (peticion, respuesta) => {
    const { id } = peticion.params
    const [product] = products.splice(parseInt(id) - 1, 1)
    respuesta.json({ borrada: product })
})

function getAllProducts() {
    const container = new Container();
    const file = "./products.txt";
    const allProductsArray = container.read(file);
    return allProductsArray;
}


onInit();

servidor.listen(8000);
console.log("Servidor corriendo en el puerto " + PORT);
