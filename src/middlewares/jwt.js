import jwt from "jsonwebtoken"
import userService from "../services/userservice.js"
import { ENV_KEYS } from "../app.js"

export const  generateToken = (user, time = '5m')  => {
    const payload = {userId: user._id}
    return jwt.sign(payload, process.env.SECRET, { expiresIn: time });
}

export const checkAuth = async (req, res, next) => {
    try {
        const authCokie = req.cookies.Authorization
        if (!authCokie) return res.status(403).json({ msg: "Unhautorized" })
        const decode = jwt.verify(authCokie, ENV_KEYS.SECRET)
        const user = await userService.searchUserById(decode.userId)
        if (!user) return res.status(404).json({ msg: "User not found" })
        //renovar token 
        const now = Math.floor(Date.now() / 1000) 
        const tokenExp = decode.exp 
        const timeUntilExp = tokenExp - now 
        if (timeUntilExp <= 300) {
            const newToken = generateToken(user, "5m")
            res.set("Authorization", `Bearer ${newToken}`)
        }
        req.user = user
        next()
    } catch (error) {
        res.status(403).json({ msg: "Unhautorized" })
    }
}