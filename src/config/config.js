export const config = {
    MONGO_URI : process.env.MONGO_URI,
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PERSISTENCE,
    PERSISTENCE2: process.argv[2],
    SECRET: process.env.SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    FRONT_ORIGIN: process.FRONT_ORIGIN,
    ENVIROMENT: process.argv[3],
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_PORT: process.env.EMAIL_PORT,
    MONGO_URI_TEST: process.env.MONGO_URI_TEST
}