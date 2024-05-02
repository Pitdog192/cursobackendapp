import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import productManager from './productos.js'

class CartManager{
    constructor(path){
        this.path = path
    }

    async createCart(){
        if (!fs.existsSync(this.path)) {
            try {
                // Crear el archivo si no existe
                let file = await fs.promises.writeFile(this.path, '[]', 'utf-8')
                console.log(`Archivo creado: ${this.path}`)
                if(!file) throw new Error(`Error al crear el archivo`)
            } catch (error) {
                throw error
            }
        }
        try {
            let cartContent = await fs.promises.readFile(this.path, 'utf-8')
            let cartContentObject = JSON.parse(cartContent)
            const newCart = {
                id: uuidv4(),
                products: []
            }
            let findCart = cartContentObject.find(cart => cart.id === newCart.id)
            if(findCart) throw new Error(`Cart already exist`)
            cartContentObject.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartContentObject, null, 4), (err) => err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`Carrito creado con éxito`))
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async listCart(cid){
        try {
            let cartContent = await fs.promises.readFile(this.path, 'utf-8')
            if(!cartContent) throw new Error(`File do not exist`)
            let cartContentObject = JSON.parse(cartContent)
            let findedCart = cartContentObject.find(cart => cart.id === cid)
            if(!findedCart) throw new Error('Cart does not exist')
            return findedCart.products
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async insertProduct(cid, pid){
        try {
            let cartContent = await fs.promises.readFile(this.path, 'utf-8')
            let cartContentObject = JSON.parse(cartContent)
            let findedCart = cartContentObject.find(cart => cart.id === cid)
            if(!findedCart) throw new Error('Cart does not exist')
            let product = await productManager.getProductById(pid)
            let productInCart = findedCart.products.find(prod => prod.product === product.id)
            if(!productInCart){
                findedCart.products.push({product: product.id, quantity: 1})
            } else {
                productInCart.quantity += 1
            }
            await fs.promises.writeFile(this.path, JSON.stringify(cartContentObject, null, 4), (err) => err ? console.err(`Error al escribir en el archivo: ${err}`) : console.log(`Carrito creado con éxito`))
            return findedCart.products
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

const cartManager = new CartManager('./src/carts.json')
export default cartManager

