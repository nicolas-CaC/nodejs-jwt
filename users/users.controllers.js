import { db } from './index.js'





/**
 * Endpoint response '/users/'
 * @param {Request} _ Client Request
 * @param {Response} res Client Response
 */
const getUsers = (_, res) => {
    const result = db.getUsers()
    res.json(result)
}



/**
 * Endpoint response '/users/:id'
 * @param {Request} _ Client Request
 * @param {Response} res Client Response
 */
const getUserById = (req, res) => {
    const { id } = req.params
    const result = db.getUserById(id)
    res.json(result)
}




export const controllers = {
    getUsers,
    getUserById
}  