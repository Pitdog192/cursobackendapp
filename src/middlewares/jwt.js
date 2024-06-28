import jwt from "jsonwebtoken"
import userService from "../services/userservice";

export const generateToken = (user, time = "5m") => {
    const payload = {
        userId: user._id,
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: time,
    })
}

export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization")
        if (!authHeader) res.status(403).json({ msg: "Unhautorized" })
        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userService.searchUserById(decode.userId)
        if (!user) res.status(404).json({ msg: "User not found" })
        //REFRESH TOKEN
        // Verificar si el token está a punto de expirar
        const now = Math.floor(Date.now() / 1000) // Tiempo actual en segundos
        const tokenExp = decode.exp // Tiempo de expiración del token
        const timeUntilExp = tokenExp - now // Tiempo hasta la expiración en segundos
        if (timeUntilExp <= 300) {
            // 300 segundos = 5 minutos
            // Generar un nuevo token con un tiempo de expiración renovado
            const newToken = generateToken(user, "5m")
            console.log(">>>>>>SE REFRESCÓ EL TOKEN")
            res.set("Authorization", `Bearer ${newToken}`) // Agregar el nuevo token al encabezado
        }
        req.user = user
        next()
    } catch (error) {
        res.status(403).json({ msg: "Unhautorized" })
    }
}