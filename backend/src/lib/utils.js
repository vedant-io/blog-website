import jwt from "jsonwebtoken";
import config from "../config.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, config.jwtSecret, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: 'strict'
    })
    return token;
}