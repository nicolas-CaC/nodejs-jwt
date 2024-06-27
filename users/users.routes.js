import { Router } from 'express'
import { controllers } from './index.js'
import { middlewares } from '../auth/index.js'

export const routes = Router()

routes
    .get('/',
        controllers.getUsers)

    .get('/:id',
        middlewares.authJWT,
        controllers.getUserById)
