import userDao from '../dao/factory.js'
import UserDto from '../dto/user.res.dto.js'

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async sendUserInfo(user){
        try {
            const userDTO = new UserDto(user)
            return userDTO
        } catch (error) {
            throw new Error(error)
        }
    }
}