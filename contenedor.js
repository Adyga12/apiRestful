const fs = require('fs');

class Contenedor {
    save(product, file) {
        let nextId = this.getNextId(file);
        product.id = nextId;
        const allProductsArray = this.read(file);
        allProductsArray.push(product);

        this.write(allProductsArray, file);
    }

    getNextId(file) {
        let lastId = 0;
        let allProductsArray = this.read(file);
        if (allProductsArray.length > 0) {
            lastId = allProductsArray[allProductsArray.length - 1].id;
        }
        return lastId + 1;
    }

    read(file) {
        let allProductsArray = [];
        try {
            allProductsArray = fs.readFileSync(file, 'utf8');

            allProductsArray.length > 0 ? allProductsArray = JSON.parse(allProductsArray) : allProductsArray = [];
        } catch (err) {
            console.log('Error en la lectura del archivo', err);
        }
        return allProductsArray;
    }

    addNewProduct(newProduct) {
        const products = (this.read("./products.txt"));
        products.push(newProduct);
        fs.writeFileSync("./products.txt", JSON.stringify(products));
    }

    updateProductById(id, productUpdated) {
        id = Number(id);
        const products = (this.read("./products.txt"));
        const oldProduct = products.filter(product => product.id === id);
        const productsUpdated = products.map(product => (product.id == id ? { ...productUpdated, id } : product));
        fs.writeFileSync("./products.txt", JSON.stringify(productsUpdated));

        return oldProduct;
    }

    deleteByIdByMe(id) {
        const products = (this.read("./products.txt"));
        const productsUpdated = products.filter(product => product.id != id);
        fs.writeFileSync("./products.txt", JSON.stringify(productsUpdated));
    }

    async write(allProductsArray, file) {

        let json = JSON.stringify(allProductsArray);
        try {
            await fs.writeFileSync(file, json);
        } catch (err) {
            console.log('Error en la escritura', err);
        }
    }


    getById(id, file) {
        let allProductsArray = this.read(file);
        let product = allProductsArray.find(product => product.id == id);
        return product ? product : null;
    }


    getAll(file) {
        let allProductsArray = this.read(file);
        return allProductsArray;
    }



    deleteById(id, file) {
        let allProductsArray = this.read(file);
        let index = allProductsArray.findIndex(product => product.id == id);
        if (index >= 0) {
            allProductsArray.splice(index, 1);
            let json = JSON.stringify(allProductsArray);
            try {
                fs.writeFileSync(file, json);
                return id
            }
            catch (err) {
                console.log('Error en la escritura', err);
            }
        }
    }

    deleteAll(file) {
        let allProductsArray = [];
        let json = JSON.stringify(allProductsArray);
        try {
            fs.writeFileSync(file, json);
        }
        catch (err) {
            console.log('Error en la escritura', err);
        }
    }



    async createFile(file_path) {
        try {
            if (fs.existsSync(file_path)) {
                console.log('El archivo ya existe, entonces no hago nada');
                return false
            } else {
                console.log('El archivo no existe, entonces lo creo!');
                await fs.promises.writeFile(file_path, '', 'utf8');
                return true;
            }
        } catch (err) {
            console.log('Error en la creación del archivo', err);
            return false;
        }
    }
}



module.exports = Contenedor;