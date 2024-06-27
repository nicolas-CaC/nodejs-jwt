import express from 'express'
import { authRoutes, config } from './auth/index.js'
import { usersRoutes } from './users/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const PORT = 8080

app.use(cors({
    methods: ["POST"],
    // origin: 'http://localhost:5500'
    origin: /http:\/\/localhost:*/
}))
app.use(cookieParser(config.secretKey))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

app.listen(PORT, () => {
    console.clear()
    console.log(`Escuchando desde http://localhost:${PORT}`)
})