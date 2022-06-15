import jwt from "jsonwebtoken"
import config from "../config/config.js"

export function generateToken(user) {
    return jwt.sign(
        user,
        config.SECRET,
        { expiresIn: "30m" },
    )
}

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json("Invalid token data")
    }

    jwt.verify(token, config.SECRET, err => {
        if (err) {
            return res.status(403).json("Invalid token")
        }

        next()
    })
}