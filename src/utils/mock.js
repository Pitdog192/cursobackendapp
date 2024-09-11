import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn({separator: '-'}),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.avatar(),
        owner: faker.person.name(),
    }
}

export const generateUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

