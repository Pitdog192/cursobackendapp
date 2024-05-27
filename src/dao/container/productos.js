import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
class ProductManager {
    constructor(path) {
        this.path = path
        this.productInterface = {
            title: undefined,
            description: undefined,
            price: undefined,
            code: undefined,
            stock: undefined,
            category: undefined
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
            let newProductInterface = JSON.stringify(Object.keys(newProduct).filter(prod => prod !== "thumbnails"))
            if (productInterface !== newProductInterface) return console.log(`Todos los campos del producto ${newProduct.title} deben ser obligatorios`)
            // Validar que no se repita el campo "code"
            const existingProduct = productosArchivo.find(p => p.code === newProduct.code)
            if (existingProduct) throw new Error (`The product code ${newProduct.code} already exists.`)
            //Inserción del producto nuevo al archivo
            newProduct.status = true
            newProduct.id = uuidv4()
            productosArchivo.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productosArchivo, null, 4), (err) => err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`${newProduct.title} agregado con éxito`))
            return newProduct
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getProducts(limit) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('File does not exist') })()
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
            fs.existsSync(this.path) || (() => { throw new Error('File does not exist') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            let productoById = contenidoParsed.find((prod) => prod.id === id)
            if (!productoById) throw new Error(`Solicitated product with id: ${id} does not exist`)
            return productoById
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateProduct(pid, newProduct) {
        try {
            fs.existsSync(this.path) || (() => { throw new Error('File does not exist') })()
            let contenidoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            let contenidoParsed = JSON.parse(contenidoArchivo)
            let productoById = contenidoParsed.find((prod) => prod.id === pid)
            if(!productoById) throw new Error(`Solicitated product with id: ${pid} does not exist`)
            const {...propiedades} = productoById
            if(newProduct.hasOwnProperty('id')) throw new Error(`ID cannot be moddified`)
            let updatedProduct = {
                ...propiedades,
                ...newProduct
            }
            let index = contenidoParsed.findIndex((prod) => prod.id === pid)
            contenidoParsed.splice(index, 1, updatedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(contenidoParsed, null, 4))
            return updatedProduct
        } catch (error) {
            console.log(`Error getProducts: ${error}`)
            throw error
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
                throw new Error(`No se encontró el producto con id: ${id}`)
            }
        } catch (error) {
            console.log(`Error getProducts: ${error}`)
            throw error
        }
    }
}

const productManager = new ProductManager('./src/productos.json')
export default productManager