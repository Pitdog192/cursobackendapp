import fs from 'fs'
class ProductManager {
    constructor(path) {
        this.path = path
        this.productInterface = {
            title: undefined,
            description: undefined,
            price: undefined,
            thumbnail: undefined,
            code: undefined,
            stock: undefined
        }
    }

    async addProduct(newProduct) {
        if (!fs.existsSync(this.path)) {
            try {
                // Crear el archivo si no existe
                await fs.promises.writeFile(this.path, '[]', 'utf-8')
                console.log(`Archivo creado: ${this.path}`)
            } catch (error) {
                throw new Error(`Error al crear el archivo: ${error}`)
            }
        }
        try {
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let productosArchivo = JSON.parse(contenidoArchivo)
            // Validar que todos los campos sean obligatorios
            let productInterface = JSON.stringify(Object.keys(this.productInterface))
            let newProductInterface = JSON.stringify(Object.keys(newProduct))
            if (productInterface !== newProductInterface) return console.log(`Todos los campos del producto ${newProduct.title} deben ser obligatorios`)
            // Validar que no se repita el campo "code"
            const existingProduct = productosArchivo.find(p => p.code === newProduct.code)
            if (existingProduct) throw new Error (`El código de producto ${newProduct.title} ya existe`)
            //Inserción del producto nuevo al archivo
            newProduct.id = productosArchivo.length + 1
            productosArchivo.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productosArchivo, null, 4), (err) => err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`${newProduct.title} agregado con éxito`))
            return newProduct
        } catch (error) {
            console.log(`Error addProduct: ${error}`)
            throw error
        }
    }

    async getProducts(limit) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('El archivo no existe') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            if (!contenidoParsed) throw new Error('Error al buscar todos los productos');
            return contenidoParsed.slice(0, limit);
        } catch (error) {
            console.log(`Error getProducts: ${error}`)
            throw error
        }
    }

    async getProductById(id) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('El archivo no existe') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            let productoById = contenidoParsed.find((prod) => prod.id === parseInt(id))
            if (!productoById) throw new Error(`Solicitated product with id: ${id} does not exist`)
            return productoById
        } catch (error) {
            console.log(`Error getProductsById: ${error}`)
            throw error
        }
    }

    async updateProduct(id, newProduct) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('El archivo no existe') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            // Validar que todos los campos sean obligatorios
            let productInterface = JSON.stringify(Object.keys(this.productInterface))
            let newProductInterface = JSON.stringify(Object.keys(newProduct))
            if (productInterface !== newProductInterface) return console.log(`Todos los campos del producto ${newProduct.title} deben ser obligatorios`)
            //asignación del mismo id al producto que cambía
            let productoById = contenidoParsed.find((prod) => prod.id === id)
            newProduct.id = productoById.id
            let index = contenidoParsed.findIndex((prod) => prod.id === id)
            contenidoParsed.splice(index, 1, newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(contenidoParsed, null, 4), (err) => {
                err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`${newProduct.title} modificado con éxito`)
            })
        } catch (error) {
            console.log(`Error getProducts: ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('El archivo no existe') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            let productoById = contenidoParsed.find((prod) => prod.id === id)
            if (productoById) {
                let index = contenidoParsed.findIndex((prod) => prod.id === id)
                contenidoParsed.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoParsed, null, 4), (err) => {
                    err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`Producto con id: ${id} eliminado con éxito`)
                })
            } else {
                console.log(`No se encontró el producto con id: ${id}`)
            }
        } catch (error) {
            console.log(`Error getProducts: ${error}`)
        }
    }
}

const product1 = {
    title: "Producto 1",
    description: "Este es el primer producto",
    price: 100,
    thumbnail: "https://example.com/product1.jpg",
    code: "PROD-1",
    stock: 10,
}
const product2 = {
    title: "Producto 2",
    description: "Este es el segundo producto",
    price: 200,
    thumbnail: "https://example.com/product2.jpg",
    code: "PROD-2",
    stock: 5,
}
const product3 = {
    title: "Producto 3",
    description: "Este es el tercer producto",
    // price: 5000,
    //le falta el precio para comprobar que no lo registre
    thumbnail: "https://example.com/product3.jpg",
    code: "PROD-3",
    stock: 15,
}

const productManager = new ProductManager('./src/container/productos.json')
export default productManager