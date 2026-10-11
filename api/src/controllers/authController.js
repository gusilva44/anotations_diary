import { Router } from 'express'
const endpoints = Router()
import * as service from '../services/authService.js'
import { autenticar } from '../middleware/autenticado.js';
import { formatarError, logError } from '../utils/error.js';
import autorizarTipo from '../middleware/autorizarTipo.js';

endpoints.post('/auth/cadastrar', async (req, res) => {
    try {
        const resultado = await service.criarUsuario(req.body)

        res.status(200).json({
            mensagem: "Cliente cadastrado com sucesso",
            resultado
        })
    } catch (error) {
        logError(error)
        res.status(400).json(formatarError(error))
    }
})

endpoints.post('/auth/login', async (req, res) => {
    try {
        const { email, pin } = req.body
        
        const resultado = await service.login(email, pin)

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            resultado: resultado.token
        })
    } catch (error) {
        logError(error)
        res.status(400).json(formatarError(error))
    }
})

endpoints.get('/auth/me', autenticar, autorizarTipo('cliente', 'admin'), async (req, res) => {
    try {
        const idUsuario = req.usuario.id_usuario
        const dados = await service.buscarUsuarioAutenticado(idUsuario)

        res.status(200).json({ dados })

    } catch (error) {
        return res.status(401).json({
            mensagem: "Sessão expirada ou inválida"
        })
    }
})

export default endpoints;