export default class ProductDTO {
    constructor(prod) {
        this.name = prod.nombre;
        this.description = prod.descripcion;
        this.price = prod.precio;
        this.stock = prod.disponibilidad;
    }
}