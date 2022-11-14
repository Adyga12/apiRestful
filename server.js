const http = require('http');
const express = require('express');
const Container = require('./contenedor')
const servidor = express();
const PORT = 8000;
let products = null;

function onInit() {
    products = getAllProducts();
    console.log('Productos cargados: ', products);

}

servidor.get('/products', (peticion, respuesta) => {
    respuesta.send(products);
});

servidor.get('/productRandom', (peticion, respuesta) => {
    respuesta.send(getProductRandom());
});

function getAllProducts() {
    const container = new Container();
    const file = './products.txt';
    const allProductsArray = container.read(file);
    return allProductsArray;
}

function getProductRandom() {
    const container = new Container();
    const file = './products.txt';
    const allProductsArray = container.read(file);
    const randomIndex = Math.floor(Math.random() * allProductsArray.length);
    return allProductsArray[randomIndex];
}

onInit();

servidor.listen(8000);
console.log('Servidor corriendo en el puerto ' + PORT);