export default class ProductDTO {
    constructor(prod) {
        this.id = prod._id;
        this.nombre = prod.title;
        this.descripcion = prod.description;
        this.precio = prod.price;
        this.codigo = prod.code;
        this.stock = prod.stock;
        this.categoria = prod.category;
    }
}