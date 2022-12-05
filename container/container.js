const fs = require("fs");

/*
Schema
    product ={
        title: String (required), 
        price: Number (required),
        thumbnail: String
}
*/

const pathToProducts = "./files/products.json";

class Container {
    saveProduct = async (product) => {
        if (!product.title || !product.price)
            return { status: "error", error: "missing field" };

        try {
            if (fs.existsSync(pathToProducts)) {
                let data = await fs.promises.readFile(pathToProducts, "utf-8");
                let products = JSON.parse(data);
                let id = products[products.length - 1].id + 1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(
                    pathToProducts,
                    JSON.stringify(products, null, 2)
                );
                return {
                    status: "success",
                    message: `Product saved id:${product.id}`,
                };
            } else {
                //el archivo no existe
                product.id = 1;
                await fs.promises.writeFile(
                    pathToProducts,
                    JSON.stringify([product], null, 2)
                );
                return {
                    status: "success",
                    message: `Product saved id:${product.id}`,
                };
            }
        } catch (error) {
            return { status: "error", message: error };
        }
    };

    getAll = async () => {
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, "utf-8");
            let products = JSON.parse(data);
            if (products) return products;
            return { status: "error", message: "error" };
        }
    };
}

module.exports = Container;