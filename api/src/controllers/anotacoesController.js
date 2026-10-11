import { Router } from 'express'
import { autenticar } from '../middleware/autenticado';
import * as service from '../services/anotacoesService.js'
import autorizarTipo from '../middleware/autorizarTipo.js'
import { formatarError, logError } from '../utils/error';
const endpoints = Router()

endpoints.get('/anotacoes', 
    autenticar, 
    autorizarTipo('cliente'),
    async (req, res) => {
    try {
        const id = Number(req.usuario.id_usuario)

        const resposta = await service.buscarAnotacoes(id)

        res.status(200).json(resposta)
    } catch (error) {
        logError(error)
        res.status(400).json(formatarError(error))
    }
})


endpoints.post('/anotacoes',
    autenticar,
    autorizarTipo('cliente'),
    async (req, res) => {
        try {
            const dados = req.body
            const id_usuario = Number(req.usuario.id_usuario)

            const resultado = await service.criarAnotacao(dados, id_usuario)

            res.status(201).json(resultado)
        } catch (error) {
            logError(error)
            res.status(400).json(formatarError(error))
        }
    }
)

endpoints.get('/anotacoes', 
    autenticar,
    autorizarTipo('cliente'),
    async (req, res) => {
        try {
            const resultado = await service.buscarAnotacoesPorFiltro(req.query)

            res.status(200).json(resultado)
        } catch (error) {
           logError(error)
           res.status(404).json(formatarError(error)) 
        }
    }
)

endpoints.delete('/anotacoes/:id',
    autenticar,
    autorizarTipo('cliente'),
    async(req, res) => {
        try {
            const id_usuario = Number(req.usuario.id_usuario)
            const id_anotacao = Number(req.params.id)

            const resultado = await service.deletarAnotacao(id_anotacao, id_usuario)

            res.status(200).json(resultado)
        } catch (error) {
            logError(error)
            res.status(404).json(formatarError(error))
        }
    }
)

endpoints.put('/anotacoes/:id', 
    autenticar,
    autorizarTipo('cliente'),
    async (req, res) => {
        try {
            const dados = req.body
            const id_anotacao = Number(req.params.id)
            const id_usuario = Number(req.usuario.id_usuario)

            const resultado = service.atualizarAnotacao(dados, id_anotacao, id_usuario)

            res.status(200).json(resultado)
        } catch (error) {
            logError(error)
            res.status(404).json(formatarError(error))
        }
    }
)

export default endpoints;