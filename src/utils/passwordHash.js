import bcryptjs from "bcryptjs"

export const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
export const isValidPassword = (password, user) => bcryptjs.compareSync(password, user.password);