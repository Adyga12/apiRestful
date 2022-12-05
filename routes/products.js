const express = require("express");
const router = express.Router();
const fs = require("fs");
const Container = require("../container/container.js");

const userService = new Container();

//la ruta ./productos nos muesta un array con todos los productos del json
router.get("/products", (req, res) => {
    userService
        .getAll()
        .then((products) => res.render("products", { products: products }));
});

router.get("/", (req, res) => {
    res.render("form");
});

router.post("/", (req, res) => {
    let product = req.body;
    userService.saveProduct(product).then((result) => console.log(result));
    res.redirect("/");
});

module.exports = router;