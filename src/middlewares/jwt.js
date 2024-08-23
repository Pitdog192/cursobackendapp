import jwt from "jsonwebtoken"
import userService from "../services/userservice.js"
import { config } from "../config/config.js"

export const  generateToken = (user, time = '5m')  => {
    const payload = {userId: user._id}
    return jwt.sign(payload, config.SECRET, { expiresIn: time });
}

export const checkAuth = async (req, res, next) => {
    try {
        const authCokie = req.cookies.Authorization
        const tokenpass = req.cookies.tokenpass

        if(tokenpass){
            const decode = jwt.verify(tokenpass, config.SECRET)
            const user = await userService.searchUserById(decode.userId)
            if (!user) return res.status(404).json({ msg: "User not found" })
            req.user = user
            next()
            return
        }
        
        if (!authCokie) return res.status(403).json({ msg: "Unhautorized" })
        const decode = jwt.verify(authCokie, config.SECRET)
        const user = await userService.searchUserById(decode.userId)
        if (!user) return res.status(404).json({ msg: "User not found" })
        //renovar token 
        const now = Math.floor(Date.now() / 1000) 
        const tokenExp = decode.exp 
        const timeUntilExp = tokenExp - now 
        if (timeUntilExp <= 300) {
            const newToken = generateToken(user)
            res.set("Authorization", `Bearer ${newToken}`)
        }
        req.user = user
        next()
    } catch (error) {
        res.status(403).json({ msg: "Unhautorized" })
    }
}