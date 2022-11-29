const http = require('http');
const express = require('express');
const Container = require('./contenedor');
const server = express();


server.set("port", process.env.PORT || 8000);
const PORT = server.get("port");

server.use(express.json());
const container = new Container();
const file = "./products.txt";

server.get("/api/products", (req, res) => {
    const allProductsArray = container.read(file);
    res.json(allProductsArray);
});


server.get("/api/product/:id", (req, res) => {
    const { id } = req.params
    const allProductsArray = container.read(file);
    res.json({ buscada: allProductsArray[parseInt(id) - 1] })
});

server.post('/api/products', (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    const products = container.getAll("./products.txt");
    const newProduct = { id: products.length, nombre, cantidad, precio, };
    container.addNewProduct(newProduct);
    res.json({ agregada: newProduct.id });
});


server.put('/api/products/:id', (req, res) => {
    const product = req.body;
    const { id } = req.params;
    const oldProduct = container.updateProductById(id, product);
    res.json({ productUpdated: product, oldProduct });
});


server.delete('/api/products/:id', (req, res) => {
    const { id } = req.params
    if (!container.getById(id, "./products.txt")) {
        res.json({
            error: "This id doesn't exist"
        })
    } else {
        container.deleteByIdByMe(id);
        res.json({
            successfully: "product deleted"
        });
    }
});

server.listen(PORT, () => {
    console.log("Server running on port " + PORT + `\nVisit: http://localhost:${PORT}`);
});
