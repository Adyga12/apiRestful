const express = require("express");
const handlenbars = require("express-handlebars");
const productsRouter = require("./routes/products.js");

const app = express();

const server = app.listen(8080, () => {
    console.log("listening on port 8080");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", productsRouter);

app.engine("handlebars", handlenbars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");