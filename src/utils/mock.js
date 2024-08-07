import { faker } from '@faker-js/faker';

const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn({separator: '-'}),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.productAdjective(),
        thumbnail: faker.image.avatar()
    }
}

export default generateProduct