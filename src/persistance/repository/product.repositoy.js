import factory from '../dao/factory.js'
import ProductDTO from '../dto/product.req.dto.js'
const {productDao} = factory
export default class ProductRepository {
    constructor(){
        this.dao = productDao;
    }

    async getById(id){
        try {
            const prod = await this.dao.getById(id);
            if(prod){
                return new ProductDTO(prod);
            } else return null
        } catch (error) {
            throw new Error(error)
        }
    }
}