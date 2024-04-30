import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

class CartManager{
    constructor(path){
        this.path = path
    }

    async createCart(){
        try {
            if (!fs.existsSync(this.path)) {
                try {
                    // Crear el archivo si no existe
                    await fs.promises.writeFile(this.path, '[]', 'utf-8')
                    console.log(`Archivo creado: ${this.path}`)
                } catch (error) {
                    throw new Error(error)
                }
            }
        } catch (error) {
            throw error
        }
    }
}

const cartManager = new CartManager('./carts.json')
export default cartManager

