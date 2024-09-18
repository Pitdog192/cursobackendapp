import userDao from '../dao/factory.js'
import {UserDto, User} from '../dto/user.res.dto.js'

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

    async sendAllUsersInfo(allUsers){
        try {
            let returnedUsers = []
            for (let index = 0; index < allUsers.length; index++) {
                const user = new User(allUsers[index])
                returnedUsers.push(user)
            }
            return returnedUsers
        } catch (error) {
            throw new Error(error)
        }
    }
}