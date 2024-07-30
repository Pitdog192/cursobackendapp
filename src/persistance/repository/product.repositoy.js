import { productDao } from '../dao/factory.js'
import ProductDTO from '../dto/product.req.dto.js'

export default class ProductRepository {
    constructor(){
        this.dao = productDao;
    }

    async createProd(prod){
        try {
            const prodDTO = new ProductDTO(prod);
            return await this.dao.create(prodDTO);
        } catch (error) {
            throw new Error(error)
        }
    }
}