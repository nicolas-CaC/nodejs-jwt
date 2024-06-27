let id = 1;
const users = []



/**
 * Return users
 * @returns {object[]}
 */
function getUsers() {
    return users;
}



function getUserById(id) {
    const result = users.find(user =>
        user.id === parseInt(id))
    return result
}


function getUserByName(username) {
    const result = users.find(user =>
        user.username === username)
    return result
}



/**
 * Create a new user in DB
 * @param {{user: string, password: string}} user 
 */
function createUser(user) {
    user = { id: id++, ...user }
    users.push(user)
    return true
}



export const db = {
    getUsers,
    getUserByName,
    getUserById,
    createUser
}