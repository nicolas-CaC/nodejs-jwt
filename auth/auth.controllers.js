import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../auth/index.js'
import { db as usersDB } from '../users/index.js';




/**
 * Endpoint response '/auth/register'
 * @param {Request} req Client Request 
 * @param {Response} res Client Response
 */
const register = (req, res) => {

    const { username, password } = req.body

    /*
    Cifrado/Encriptación:
    Es el proceso/algoritmo que realizamos para transformar información legible a ilegible
    
    
    Hash:
    El hash es una representación única y de longitud fija de un conjunto de datos o caracteres, si el elemento a hashear cambia en lo mas mínimo, el hash cambia
    
    
    Uso:
    El hash sirve para ser parte del proceso de cifrado, no es cifrado en sí
    
    
    Bcryptjs:
    Sirve para la codificación y encriptado
    
    Bcryptjs agrega una cadena aleatoria antes de hashear, por ello cambia el hash
    cada vez que lo hacemos
    
    El segundo parámetro hace referencia a las rondas de hasheo (re-hasheo, cantidad de veces que se hace el proceso de hash), a mayores
    vueltas da más seguridad pero la exigencia computacional es mayor (proceso pesado)
    */
    const hash = bcrypt.hashSync(password, 10)

    const user = { username, password: hash }
    const result = usersDB.createUser(user)

    /*
    Codificación: 
    Es la transformación de los datos de un formato a otro.
    La idea de la codificación no es la de crear un valor único, sino transformación.
    
    JWT Se compone de tres partes: 
    - Headers (incluye toda la información del proceso de codificación)
    - Payload (el material de valor a transferir)
    - Signature (la firma que se elabora en el servidor gracias a nuestra clave secreta)
    
    Cada sección de la información se codifica en Base64 y se adjunta (punto mediante)
    
    Base64 es un conjunto de 64 caracteres que lo componen mayús, minus, números y símbolos.
    Cada grupo de 3 bytes (24 bits) se dividen en 4 grupos de 6 bits, estos se mapean en los caracteres que conforman la Base64
    */
    const signature = config.secretKey
    const payload = { id: user.id, username: user.username }
    const token = jwt.sign(payload, signature, config.token)

    result
        ? res
            .status(201)
            // .set('authorization', `Bearer ${token}`)
            // .cookie('token', token, config.cookie)
            .cookie('token', token, config.cookie)
            .redirect('/')

        : res.send('Algo salió mal. Vuelta atrás e inténtelo de nuevo.')
}



/**
 * Endpoint response '/auth/login'
 * @param {Request} req Client Request 
 * @param {Response} res Client Response
 */
const login = (req, res) => {

    const { username, password } = req.body

    // Buscamos usuarios
    const user = usersDB.getUserByName(username)

    if (!user) return res
        .status(404)
        .json({ error: true, desc: 'User not Found' })

    // Comprobamos la contraseña
    const isValid = bcrypt.compareSync(password, user.password)

    if (!isValid) return res
        .status(404)
        .json({ error: true, desc: 'Invalid password' })

    const signature = config.secretKey
    const payload = { id: user.id, username: user.username }

    const token = jwt.sign(payload, signature, config.token)

    res
        .status(200)
        // .set('authorization', `Bearer ${token}`)
        .cookie('token', token, config.cookie)
        .redirect('/')
}



export const controllers = {
    register,
    login
}