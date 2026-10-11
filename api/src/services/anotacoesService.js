import { Router } from 'express'
import { autenticar } from '../middleware/autenticado.js'
import autorizarTipo from '../middleware/autorizarTipo.js'
import * as service from '../services/anotacoesService.js'
import { formatarError, logError } from '../utils/error.js'

const endpoints = Router()

const protegerRota = [autenticar, autorizarTipo('cliente', 'admin')]

endpoints.get('/anotacoes', ...protegerRota, async (req, res) => {
    try {
        const id = req.usuario.id_usuario 
        const resultado = await service.buscarAnotacoes(id)

        return res.status(200).json(resultado)
    } catch (error) {
        logError(error)
        return res.status(400).json(formatarError(error))
    }
})

endpoints.get('/anotacoes/filtro', ...protegerRota, async (req, res) => {
    try {
        const id_usuario = req.usuario.id_usuario
        const resultado = await service.buscarAnotacoesPorFiltro(req.query, id_usuario)

        return res.status(200).json(resultado)
    } catch (error) {
        logError(error)
        return res.status(400).json(formatarError(error))
    }
})

endpoints.post('/anotacoes', ...protegerRota, async (req, res) => {
    try {
        const resultado = await service.criarAnotacao(req.body, req.usuario.id_usuario)

        return res.status(201).json({
            mensagem: 'Anotação criada com sucesso',
            id_anotacao: resultado
        })
    } catch (error) {
        logError(error)
        return res.status(400).json(formatarError(error))
    }
})

endpoints.delete('/anotacoes/:id', ...protegerRota, async (req, res) => {
    try {
        const resultado = await service.deletarAnotacao(req.params.id, req.usuario.id_usuario)

        if (!resultado) {
            return res.status(404).json({
                mensagem: 'Anotação não encontrada'
            })
        }

        return res.status(200).json({
            mensagem: 'Anotação excluída com sucesso'
        })
    } catch (error) {
        logError(error)
        return res.status(400).json(formatarError(error))
    }
})

endpoints.put('/anotacoes/:id', ...protegerRota, async (req, res) => {
    try {
        const resultado = await service.atualizarAnotacao(req.body, req.params.id, req.usuario.id_usuario)
        
        if (!resultado) {
            return res.status(404).json({
                mensagem: 'Anotação não encontrada ou não alterada'
            })
        }

        return res.status(200).json({
            mensagem: 'Anotação atualizada com sucesso'
        })
    } catch (error) {
        logError(error)
        return res.status(400).json(formatarError(error))
    }

})  

export default endpoints