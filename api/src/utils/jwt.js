import jwt from 'jsonwebtoken'

export function gerarToken(dados){
    return jwt.sign({
        idUsuario: dados.id_usuario,
        email: dados.email,
        tipo: dados.tipo
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export function verifiarToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}