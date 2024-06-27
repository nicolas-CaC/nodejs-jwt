const seconds = 60

export const config = {
    secretKey: 'nikito',
    token: {
        // En string declaramos la unidad (m, s, h, d), en number los segundos
        // tokenExpiresIn: 30
        // expiresIn: '1h',
        expiresIn: 10,
    },
    cookie:
    {
        maxAge: seconds * 1000,
        httpOnly: true,
        signed: true
    }

}
