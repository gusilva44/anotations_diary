import { verifiarToken } from '../utils/jwt.js'
import * as db from '../repo/authRepo.js'

export async function autenticar(req, res, next) {
    try {
        const autorizacao = req.headers.authorization

        if (!autorizacao) {
            return res.status(401).json({
                mensagem: 'Usuario não autenticado'
            })
        }

        const token = autorizacao.split(' ')[1]
        const dadosToken = verifiarToken(token)
        const usuario = await db.buscarUsuarioPorId(dadosToken.idUsuario)

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuario não encontrado'
            })
        }

        req.usuario = {
            id_usuario: usuario.id_usuario,
            email: usuario.email,
            tipo: usuario.tipo
        }

        next()

    } catch (error) {
        return res.status(401).json({
            mensagem: 'Sessão inválida ou expirada.'
        })
    }
}