export class UserDto {
    constructor(user) {
        this.nombre = user.first_name;
        this.apellido = user.last_name;
        this.email = user.email;
        this.edad = user.age;
        this.carrito = user.cart
    }
}

export class User {
    constructor(user) {
        this.nombre = user.first_name;
        this.email = user.email;
        this.rol = user.role;
    }
}