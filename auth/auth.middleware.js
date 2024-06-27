import jwt from 'jsonwebtoken'
import { config } from './index.js'

function authJWT(req, res, next) {

    // El prefijo "Bearer" indica que se está enviando un token de tipo JWT.
    // Al utilizar cookies no necesitamos separar el string con Bearer
    const token = req.signedCookies.token
    // const auth = req.cookies.token
    // console.log(auth)

    if (!token) return res
        .status(403)
        .send('Hace falta autorización')

    jwt.verify(token, config.secretKey, (err, decoded) => {

        if (err)
            return res
                .status(500)
                .send('El token ha expirado')

        // iat: IssuedAtTime: Fecha de creación del token
        // exp: Fecha de expiración del token
        console.log(decoded)

        next()
    })
}


export const middlewares = { authJWT }