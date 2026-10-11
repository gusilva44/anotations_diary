import { autenticar } from '../middleware/autenticado.js';
import { Router } from 'express'
import * as service from '../services/adminService.js'
import autorizarTipo from '../middleware/autorizarTipo.js';
import { formatarError, logError } from '../utils/error.js';

const endpoints = Router()

endpoints.get('/admin/clientes',
    autenticar, 
    autorizarTipo('admin'), 
    async (req, res) => {
    try {
        const resultado = await service.buscarTodosClientes()

        if (!resultado) throw new Error("Erro ao buscar os clientes")

        res.status(200).json(resultado)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

endpoints.get('/admin/clientes/:id', 
    autenticar,
    autorizarTipo('admin'),
    async (req, res) => {
        try {
            const id = Number(req.params.id)

            const resultado = await service.deletarClientePorId(id)

            if(!resultado) throw new Error("Erro ao buscar cliente")

            res.status(200).json(resultado)
        } catch (error) {
            logError(error)
            res.status(400).json(formatarError(error))
        }
    }
)

endpoints.put('/admin/clientes',
    autenticar,
    autorizarTipo('admin'),
    async (req, res) => {
        try {
            const id = Number(req.usuario.id_usuario)
            const dados = req.body

            const resultado = await service.atualizarCliente(dados, id)

            res.status(200).json(resultado)

        } catch (error) {
            logError(error)
            res.status(400).json(formatarError(error))
        }
    }
)

endpoints.delete("/admin/clientes/:id", 
    autenticar, 
    autorizarTipo('admin'), 
    async (req, res) => {
        try {
            const resposta = await service.deletarClientePorId(Number(req.params.id))

            if(!resposta) throw new Error("Erro ao deletar usuario.")

            res.status(200).json({
                resposta: `Usuario foi removido.`
            })
        } catch (error) {
            logError(error)
            res.status(400).json(formatarError(error))
        }
})



export default endpoints;